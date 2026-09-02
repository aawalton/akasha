import { z } from "zod"

const KNOWN_STATES = [
  "synced",
  "file_not_found",
  "parse_failed",
  "upload_failed",
  "skipped",
] as const

export type WatcherRunOperationState = (typeof KNOWN_STATES)[number]

const StoredOperationSchema = z
  .object({
    name: z.string(),
    state: z.string().optional(),
    ranAt: z.string().optional(),
    detail: z.string().optional(),
  })
  .passthrough()

const RunOutcomeSchema = z
  .object({
    reportedAt: z.string().optional(),
    operations: z.array(z.unknown()).optional(),
  })
  .passthrough()

export type WatcherRunOperation = {
  name: string
  state: WatcherRunOperationState | null
  ranAt: string | null
  detail: string | null
}

export type WatcherRunInput = {
  reportedAt: string | null
  operations: readonly WatcherRunOperation[]
}

export type WatcherRunVerdict =
  | "never-reported"
  | "nothing-readable"
  | "files-missing"
  | "parse-failing"
  | "upload-failing"
  | "working"

export type WatcherRunSummary = WatcherRunInput & {
  verdict: WatcherRunVerdict
  decidingOperations: readonly WatcherRunOperation[]
}

function usableInstant(iso: unknown): string | null {
  if (typeof iso !== "string") return null
  return Number.isFinite(new Date(iso).getTime()) ? iso : null
}

function knownState(state: string | undefined): WatcherRunOperationState | null {
  if (state === undefined) return null
  return KNOWN_STATES.find((known) => known === state) ?? null
}

export function readReportedOperations(lastRunOutcome: unknown): WatcherRunInput {
  const parsed = RunOutcomeSchema.safeParse(lastRunOutcome)
  if (!parsed.success) return { reportedAt: null, operations: [] }

  const operations: WatcherRunOperation[] = []
  for (const entry of parsed.data.operations ?? []) {
    const op = StoredOperationSchema.safeParse(entry)
    if (!op.success) continue
    operations.push({
      name: op.data.name,
      state: knownState(op.data.state),
      ranAt: usableInstant(op.data.ranAt),
      detail: op.data.detail ?? null,
    })
  }

  return { reportedAt: usableInstant(parsed.data.reportedAt), operations }
}

function withState(
  input: WatcherRunInput,
  state: WatcherRunOperationState
): readonly WatcherRunOperation[] {
  return input.operations.filter((op) => op.state === state)
}

export function deriveWatcherRunVerdict(input: WatcherRunInput): WatcherRunVerdict {
  if (input.operations.length === 0) return "never-reported"
  if (withState(input, "file_not_found").length > 0) return "files-missing"
  if (withState(input, "parse_failed").length > 0) return "parse-failing"
  if (withState(input, "upload_failed").length > 0) return "upload-failing"
  if (withState(input, "synced").length > 0) return "working"
  return "nothing-readable"
}

const DECIDING_STATE: Record<WatcherRunVerdict, WatcherRunOperationState | null> = {
  "never-reported": null,
  "nothing-readable": null,
  "files-missing": "file_not_found",
  "parse-failing": "parse_failed",
  "upload-failing": "upload_failed",
  working: "synced",
}

export function summarizeWatcherRun(input: WatcherRunInput): WatcherRunSummary {
  const verdict = deriveWatcherRunVerdict(input)
  const state = DECIDING_STATE[verdict]
  return {
    ...input,
    verdict,
    decidingOperations: state === null ? [] : withState(input, state),
  }
}
