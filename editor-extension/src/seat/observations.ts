import { z } from 'zod';
import type { WindowIdentity } from './window-identity.ts';

export const OBSERVATIONS_VERSION = 1;

export interface SweepObservation {
	readonly swept: number;
	readonly read: number;
	readonly noProcess: number;
	readonly neverAnswered: number;
	readonly boundMs: number;
	readonly worstMs: number;
	readonly worstAt: string;
	readonly worstTrigger: string;
}

export type Outcome = 'ok' | 'failed';

export type ActivationState = 'activated' | 'failed' | 'still running';

export interface Observation {
	readonly at: string;
	readonly activation?: { readonly state: ActivationState; readonly ms: number };
	readonly outcome?: Outcome;
	readonly failure?: string;
	readonly sweep?: SweepObservation;
	readonly counts?: Readonly<Record<string, number>>;
}

export interface Observations {
	readonly version: number;
	readonly writer: number;
	readonly writerStartedAt: number;
	readonly writtenAt: string;
	readonly features: Readonly<Record<string, Observation>>;
}

const SWEEP_SCHEMA = z.object({
	swept: z.number().int().min(0),
	read: z.number().int().min(0),
	noProcess: z.number().int().min(0),
	neverAnswered: z.number().int().min(0),
	boundMs: z.number().int().min(0),
	worstMs: z.number().int().min(0),
	worstAt: z.string(),
	worstTrigger: z.string(),
});

const OBSERVATION_SCHEMA = z.object({
	at: z.string(),
	activation: z
		.object({ state: z.enum(['activated', 'failed', 'still running']), ms: z.number() })
		.optional(),
	outcome: z.enum(['ok', 'failed']).optional(),
	failure: z.string().optional(),
	sweep: SWEEP_SCHEMA.optional(),
	counts: z.record(z.string(), z.number()).optional(),
});

const OBSERVATIONS_SCHEMA = z.object({
	version: z.number(),
	writer: z.number(),
	writerStartedAt: z.number(),
	writtenAt: z.string(),
	features: z.record(z.string(), OBSERVATION_SCHEMA),
});

export function parseObservations(raw: unknown): Observations | undefined {
	const parsed = OBSERVATIONS_SCHEMA.safeParse(raw);
	if (!parsed.success) { return undefined; }
	if (parsed.data.version !== OBSERVATIONS_VERSION) { return undefined; }
	return parsed.data;
}

export function buildObservations(input: {
	readonly writer: number;
	readonly writerStartedAt: number;
	readonly writtenAt: string;
	readonly features: Readonly<Record<string, Observation>>;
}): Observations {
	return { version: OBSERVATIONS_VERSION, ...input };
}

export function writerOf(record: Observations): WindowIdentity {
	return { pid: record.writer, startedAt: record.writerStartedAt };
}

export function writerOfAnyVersion(raw: unknown): WindowIdentity | undefined {
	if (raw === null || typeof raw !== 'object') { return undefined; }
	const record = raw as Record<string, unknown>;
	if (typeof record['version'] !== 'number') { return undefined; }
	if (typeof record['writer'] !== 'number') { return undefined; }
	const features = record['features'];
	if (features === null || typeof features !== 'object') { return undefined; }
	const startedAt = record['writerStartedAt'];
	return {
		pid: record['writer'],
		startedAt: typeof startedAt === 'number' ? startedAt : 0,
	};
}


const TIMESTAMP_KEYS = new Set(['at', 'worstAt']);

export function changeKey(features: Readonly<Record<string, Observation>>): string {
	return JSON.stringify(features, (key, value: unknown) => {
		if (TIMESTAMP_KEYS.has(key) && typeof value === 'string') { return undefined; }
		if (value === null || typeof value !== 'object' || Array.isArray(value)) { return value; }
		const sorted: Record<string, unknown> = {};
		for (const name of Object.keys(value as Record<string, unknown>).sort()) {
			sorted[name] = (value as Record<string, unknown>)[name];
		}
		return sorted;
	});
}

export function observationFor(
	record: Observations,
	feature: string
): Observation | undefined {
	return record.features[feature];
}

export function sweepsPayingTheBound(record: Observations): readonly string[] {
	return Object.entries(record.features)
		.filter(([, o]) => o.sweep !== undefined && o.sweep.neverAnswered > 0)
		.map(([feature]) => feature);
}

export function isLive(
	record: Observations,
	isAlive: (window: WindowIdentity) => boolean
): boolean {
	return isAlive(writerOf(record));
}
