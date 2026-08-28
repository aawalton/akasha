/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as os from 'node:os';
import * as path from 'node:path';
import { getEsoDayStr, getEsoResetTime } from '../../../../day/day.ts';
import { duringOneCall } from '../../../../during-call/during-call.ts';
import { askHere } from '../../../../readouts/ask-here.ts';
import { getDailyValues, getValuesLegend } from '../../../../readouts/daily-stoplights.ts';
import { getInboxLegend, getInboxStoplights } from '../../../../readouts/inbox-stoplights.ts';
import { getUpkeepLegend, getUpkeepStoplights } from '../../../../readouts/upkeep-stoplights.ts';
import * as vscode from 'vscode';
import { recordObservation } from '../../seat/observation-store.ts';
import { createLegendStore } from './legends.ts';
import { applyToItems, type FreshAts, type ReadOutcomes, settleReads } from './render.ts';
import { SLOTS } from "./slots.ts"
import { SEPARATOR_GLYPH, SEPARATOR_HEX } from "./theme.ts";
import type { StoplightsSection } from './slot-types.ts';
import { readUsage } from './usage.ts';

/**
 * This feature's name in the observation record, and in `extension.ts`'s list.
 *
 * This is the fastest poll in the extension, so it is the feature the change
 * detection in `seat/observations.ts` has to earn its place against: a healthy
 * status bar reports the same outcome on every poll all day and must write on
 * the first of them and none of the rest.
 */
const FEATURE = 'status-bar';

// The poll cadence. The three stoplight groups answer their queries in this
// process now, so what this bounds is work done here rather than load offered to
// the page query service; the two usage means are the only reads left that reach
// it. Nothing this bar draws moves anywhere near this fast, and
// `opsStatusBar.refreshNow` is what makes a refresh immediate.
const POLL_INTERVAL_MS = 30_000;

// Which shared read answers each stoplight group's legend. This is the ONE place the
// bar names the three groups it draws, which is what a consumer of a stoplight group
// is permitted to do; what is INSIDE each group — the readouts and their names — is
// answered by the shared read against the readout documents and is never spelled
// here. A group added to `STOPLIGHTS_SECTIONS` without a read fails to compile.
const LEGEND_READS: Readonly<
	Record<StoplightsSection, () => Promise<string>>
> = {
	upkeep: getUpkeepLegend,
	inbox: getInboxLegend,
	daily: getValuesLegend,
};

const ask = askHere();

let output: vscode.OutputChannel;

export async function activate(context: vscode.ExtensionContext): Promise<undefined> {
	output = vscode.window.createOutputChannel('Ops: Status Bar');
	context.subscriptions.push(output);

	process.env.AKASHA_ROOT ??= path.join(os.homedir(), 'repos', 'akasha');

	const items = SLOTS.map((slot) => {
		const item = vscode.window.createStatusBarItem(
			slot.id,
			vscode.StatusBarAlignment.Right,
			slot.priority
		);
		if (slot.kind === 'separator') {
			item.text = SEPARATOR_GLYPH;
			item.color = SEPARATOR_HEX;
		} else {
			item.text = '—';
			// A stoplights item gets NO tooltip here and no color: its color comes from
			// the glyphs themselves, and its tooltip is a legend that has to be read and
			// has not been read yet. It shows a dash, then its glyphs on the first poll,
			// and gains its legend whenever that read lands — see `legends.ts`.
			if (slot.kind !== 'stoplights') {
				item.color = slot.hex;
				item.tooltip = slot.label;
			}
			item.command = 'opsStatusBar.refreshNow';
		}
		item.show();
		context.subscriptions.push(item);
		return item;
	});

	// Per-section "last successful read at" carried across polls, so each
	// section's stale suffix reflects when THAT read last succeeded.
	let freshAts: FreshAts = {
		daily: undefined,
		inbox: undefined,
		upkeep: undefined,
		usage: undefined,
	};

	// The three group legends, loaded OUTSIDE the poll and never awaited by it. A cold
	// group resolve measures about seven seconds, which the bar must not spend before
	// drawing anything; a legend that fails or never lands costs its own tooltip and
	// nothing else, and each poll re-pumps whichever are still missing.
	const legendStore = createLegendStore(
		(section) => LEGEND_READS[section](),
		(section, reason) => {
			output.appendLine(
				`[legend] ${section}: ${String(reason)} — that group draws its reading with no legend`
			);
			return undefined;
		}
	);

	const refresh = async (trigger: string): Promise<undefined> => {
		// Start any legend still missing BEFORE the four reads, and go straight on —
		// `pump` never waits and is not awaited. Its result reaches the items on
		// whichever poll follows it landing, which is at most one poll later.
		legendStore.pump();
		const day = getEsoDayStr(new Date());
		// Settle the four independent reads separately so a transient failure in
		// one never blanks the others — each section renders from its own read.
		// `readUsage` leaves the database entirely and asks the page query service,
		// reducing the account pages the daemon writes.
		// ONE CALL AROUND ALL FOUR. What a readout costs is mostly working out the cache keys its
		// queries are held against — the file tree, the page type registry, the shape mark taken over
		// both — and each of those is held for the length of a call and no longer. Outside one, the
		// four groups worked all three out again per readout, in git subprocesses: measured on
		// 2026-08-28 at 18.1s and 264 spawns, against 0.96s and 13 for the same four inside one call.
		const [daily, inbox, upkeep, usage] = await duringOneCall(async () =>
			Promise.allSettled([
				getDailyValues({ day, ask }),
				getInboxStoplights({ day, ask }),
				getUpkeepStoplights({ day, ask }),
				readUsage(),
			])
		);
		const outcomes: ReadOutcomes = {
			daily,
			inbox,
			upkeep,
			usage,
		};
		const reads = settleReads(outcomes, freshAts, Date.now());
		applyToItems(items, reads, legendStore.read());
		freshAts = {
			daily: reads.daily.lastFreshAt,
			inbox: reads.inbox.lastFreshAt,
			upkeep: reads.upkeep.lastFreshAt,
			usage: reads.usage.lastFreshAt,
		};
		logRefresh(trigger, outcomes);
		return undefined;
	};

	await refresh('activate');

	const timer = setInterval(() => void refresh('poll'), POLL_INTERVAL_MS);
	context.subscriptions.push({ dispose: () => clearInterval(timer) });

	context.subscriptions.push(
		vscode.commands.registerCommand('opsStatusBar.refreshNow', () => refresh('manual'))
	);
	return undefined;
}


// Surface each failing read loudly without hiding the healthy ones: a fully
// successful poll logs "refreshed"; a partial poll names exactly which reads
// failed and why (Architecture: surface issues loudly, keep healthy signal).
function logRefresh(trigger: string, outcomes: ReadOutcomes): undefined {
	const failures: string[] = [];
	if (outcomes.daily.status === 'rejected') { failures.push(`values: ${String(outcomes.daily.reason)}`); }
	if (outcomes.inbox.status === 'rejected') { failures.push(`inbox: ${String(outcomes.inbox.reason)}`); }
	if (outcomes.upkeep.status === 'rejected') {
		failures.push(`upkeep: ${String(outcomes.upkeep.reason)}`);
	}
	if (outcomes.usage.status === 'rejected') {
		failures.push(`usage: ${String(outcomes.usage.reason)}`);
	}
	if (failures.length === 0) {
		output.appendLine(`[${trigger}] refreshed`);
		recordObservation(FEATURE, { outcome: 'ok', counts: { failedReads: 0 } });
	} else {
		output.appendLine(`[${trigger}] partial refresh — ${failures.join('; ')}`);
		// A PARTIAL REFRESH IS `failed` HERE, which the channel line does not say in a
		// word. Three of four reads landing is a working status bar with a wrong reading
		// on it, and a verifier reading `ok` off that would be reading the wrong thing.
		recordObservation(FEATURE, {
			outcome: 'failed',
			failure: failures.join('; '),
			counts: { failedReads: failures.length },
		});
	}
	return undefined;
}
