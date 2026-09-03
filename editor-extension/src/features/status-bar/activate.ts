import * as os from 'node:os';
import * as path from 'node:path';
import { duringOneCall } from '@akasha/command-system/during-call';
import * as vscode from 'vscode';
import { recordObservation } from '../../seat/observation-store.ts';
import { drawGroup, type GroupDrawing, nameTheStore } from '@akasha/editor-extension/group-stoplights';
import { NO_LEGENDS, type StoplightLegends } from './legends.ts';
import { applyToItems, type FreshAts, type ReadOutcomes, settleReads } from './render.ts';
import { SLOTS } from "./slots.ts"
import { SEPARATOR_GLYPH, SEPARATOR_HEX } from "@akasha/editor-extension/status-bar-theme";
import { readUsage } from './usage.ts';

const FEATURE = 'status-bar';

const POLL_INTERVAL_MS = 30_000;

const UPKEEP_GROUP = 'upkeep';

const INBOX_GROUP = 'inboxes';

let output: vscode.OutputChannel;

// The glyph row read off a group's drawing, so the settling and staleness below go on seeing the
// string they already did.
function glyphsSettled(settled: PromiseSettledResult<GroupDrawing>): PromiseSettledResult<string> {
	return settled.status === 'fulfilled'
		? { status: 'fulfilled', value: settled.value.glyphs }
		: settled;
}

// A GROUP THAT WOULD NOT ANSWER KEEPS THE LABELS IT LAST NAMED. The glyph row goes stale and the
// tooltip says since when; dropping the legend along with it would empty the tooltip, which reads
// as a group whose readouts have no labels rather than as a reading that did not arrive. An empty
// legend is held off for the same reason.
function legendKept(
	settled: PromiseSettledResult<GroupDrawing>,
	held: string | undefined
): string | undefined {
	if (settled.status !== 'fulfilled' || settled.value.legend === '') { return held; }
	return settled.value.legend;
}

export async function activate(context: vscode.ExtensionContext): Promise<undefined> {
	output = vscode.window.createOutputChannel('Ops: Status Bar');
	context.subscriptions.push(output);

	process.env.AKASHA_ROOT ??= path.join(os.homedir(), 'repos', 'akasha');
	nameTheStore();

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
		inbox: undefined,
		upkeep: undefined,
		usage: undefined,
	};

	let legends: StoplightLegends = NO_LEGENDS;

	const readOnce = async (trigger: string): Promise<undefined> => {
		const [inbox, upkeep, usage] = await duringOneCall(async () =>
			Promise.allSettled([
				drawGroup(INBOX_GROUP),
				drawGroup(UPKEEP_GROUP),
				readUsage(),
			])
		);
		const outcomes: ReadOutcomes = {
			inbox: glyphsSettled(inbox),
			upkeep: glyphsSettled(upkeep),
			usage,
		};
		legends = {
			inbox: legendKept(inbox, legends.inbox),
			upkeep: legendKept(upkeep, legends.upkeep),
		};
		const reads = settleReads(outcomes, freshAts, Date.now());
		applyToItems(items, reads, legends);
		freshAts = {
			inbox: reads.inbox.lastFreshAt,
			upkeep: reads.upkeep.lastFreshAt,
			usage: reads.usage.lastFreshAt,
		};
		logRefresh(trigger, outcomes);
		return undefined;
	};

	// ONE READ AT A TIME, THE WAY THE AGENT TREE ALREADY DOES IT. Every drawn slot carries
	// `opsStatusBar.refreshNow` as its click command, so a run of clicks started a run of refreshes,
	// each spawning its own `claude-usage` child and each contending with the others for the store
	// and the CPU — on a box under load the clicks that asked for a faster answer bought a slower
	// one. A trigger arriving mid-read now waits for the read in flight rather than starting a
	// second, so what a click promises is the reading in hand rather than another attempt at it.
	let reading: Promise<undefined> | undefined;

	const refresh = async (trigger: string): Promise<undefined> => {
		const inFlight = reading;
		if (inFlight !== undefined) {
			output.appendLine(`[${trigger}] a read is already in flight — waiting for it`);
			await inFlight;
			return undefined;
		}
		const started = readOnce(trigger);
		reading = started;
		try {
			await started;
		} finally {
			reading = undefined;
		}
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
