import * as os from 'node:os';
import * as path from 'node:path';
import { getEsoDayStr } from '../../../../day/day.ts';
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

const FEATURE = 'status-bar';

const POLL_INTERVAL_MS = 30_000;

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

	let freshAts: FreshAts = {
		daily: undefined,
		inbox: undefined,
		upkeep: undefined,
		usage: undefined,
	};

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
		legendStore.pump();
		const day = getEsoDayStr(new Date());
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
		recordObservation(FEATURE, {
			outcome: 'failed',
			failure: failures.join('; '),
			counts: { failedReads: failures.length },
		});
	}
	return undefined;
}
