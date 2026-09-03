import { requireMatchPositional } from "@akasha/utils-narrow/require-match-positional"
import { z } from "zod"
import { PRODUCER_TAG_RE } from "../triage-fanout-markers/triage-fanout-markers.module.code.ts"

export type AttributionBasis = "producer-tagged" | "single-stream"

export const UNATTRIBUTED_SECTION = "(unattributed)"

export type FailAttribution =
  | {
      readonly kind: "resolved"
      readonly basis: AttributionBasis
      readonly workspace: string | null
      readonly file: string | null
    }
  | { readonly kind: "declined" }

export type FailSignalKind = "test" | "tally"

export interface FailLine {
  readonly evidence: string
  readonly signal: FailSignalKind
  readonly attribution: FailAttribution
}

export interface ProducerLine {
  readonly producer: string | null
  readonly text: string
}

export interface FailSignal {
  readonly evidence: string
  readonly signal: FailSignalKind
  readonly producer: string | null
  readonly file: string | null
  readonly workspace: string | null
}

export function splitProducerTag(line: string): ProducerLine {
  if (!PRODUCER_TAG_RE.test(line)) return { producer: null, text: line }
  const [producer] = requireMatchPositional(PRODUCER_TAG_RE, z.tuple([z.string()]), line)
  return { producer, text: line.replace(PRODUCER_TAG_RE, "") }
}

export function attributionFor(signal: FailSignal, sawRunnerMarker: boolean): FailAttribution {
  if (signal.producer !== null) {
    return {
      kind: "resolved",
      basis: "producer-tagged",
      workspace: signal.producer,
      file: signal.file,
    }
  }
  if (sawRunnerMarker) return { kind: "declined" }
  return {
    kind: "resolved",
    basis: "single-stream",
    workspace: signal.workspace,
    file: signal.file,
  }
}
