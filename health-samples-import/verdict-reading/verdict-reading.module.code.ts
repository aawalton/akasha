import { renderCoverage } from "@akasha/verdict/verdict-text"

export interface VerdictCoverage {
  readonly observed: number
  readonly declared: number | null
  readonly unit: string
}

export interface VerdictFinding {
  readonly detail: string
  readonly at: string | null
}

export type ReadingState<State extends string> = State extends "pass" | "fail" ? never : State

export interface Reading<Subject extends string, State extends string, Evidence> {
  readonly subject: Subject
  readonly state: ReadingState<State>
  readonly reason: string
  readonly observedAtMs: number
  readonly coverage: VerdictCoverage
  readonly evidence: Evidence
  readonly findings: readonly VerdictFinding[]
}

export type AnyReading = Reading<string, string, unknown>

export function readingHeadline(reading: AnyReading): string {
  const head = `${reading.state.toUpperCase()} — ${reading.subject}`
  return `${head}: ${reading.reason} [over ${renderCoverage(reading.coverage)}]`
}
