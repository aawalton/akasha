import { reportError } from "@akasha/errors-client/error-reporting"

export type ReadCompletionDiagReason =
  | "enqueued"
  | "enqueue-failed"
  | "drain-attempt"
  | "drain-skipped-busy"
  | "drain-result"

export function describeThrown(error: unknown): string {
  return error instanceof Error ? error.message : String(error)
}

export interface ReadCompletionReport {
  message: string
  stack: string
  kind: "error"
  app: "alanwalton-native"
  errorUserId: null
}

export function buildReadCompletionReport(
  reason: ReadCompletionDiagReason,
  detail?: string
): ReadCompletionReport {
  return {
    message: `[read-completion] ${reason}`,
    stack: detail ?? reason,
    kind: "error",
    app: "alanwalton-native",
    errorUserId: null,
  }
}

export function reportReadCompletionDiag(
  reason: ReadCompletionDiagReason,
  detail?: string
): undefined {
  reportError(buildReadCompletionReport(reason, detail))
  return undefined
}
