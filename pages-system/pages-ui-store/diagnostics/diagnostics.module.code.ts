export type StoreDiagnosticReason =
  | "hydrate-overrun"
  | "view-read-throw"
  | "boot-gate-timeout"
  | "unacquired-sort-target"
  | "file-answer-cut"
  | "mutation-unconverged"
  | "definition-tier-empty"
  | "page-type-unbacked"

export interface StoreDiagnostic {
  readonly reason: StoreDiagnosticReason
  readonly message: string
  readonly detail: string
}

export type StoreDiagnosticsSink = (diagnostic: StoreDiagnostic) => undefined

let sink: StoreDiagnosticsSink | null = null

export function setStoreDiagnosticsSink(next: StoreDiagnosticsSink | null): undefined {
  sink = next
  return undefined
}

export function emitStoreDiagnostic(diagnostic: StoreDiagnostic): undefined {
  if (sink === null) return undefined
  try {
    sink(diagnostic)
  } catch (err: unknown) {
    console.error("pages-ui-store: diagnostics sink threw", err)
  }
  return undefined
}
