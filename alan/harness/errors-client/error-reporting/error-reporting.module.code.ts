import type { ErrorReport } from "akasha/alan/harness/errors-core/error-report/error-report.module.code.ts"

export type ReportErrorInput = Omit<ErrorReport, "url" | "userAgent">

const REPORTING = { origin: "", releaseSha: "" }

export function setErrorReportOrigin(origin: string): undefined {
  REPORTING.origin = origin
  return undefined
}

export function setReleaseSha(sha: string): undefined {
  REPORTING.releaseSha = sha
  return undefined
}

export function resolveReportReleaseSha(
  inputReleaseSha: string | undefined,
  defaultSha: string
): string | undefined {
  if (inputReleaseSha !== undefined) return inputReleaseSha
  return defaultSha !== "" ? defaultSha : undefined
}

export function reportError(input: ReportErrorInput): undefined {
  if (typeof window === "undefined") return
  try {
    const resolvedReleaseSha = resolveReportReleaseSha(input.releaseSha, REPORTING.releaseSha)
    const report: ErrorReport = {
      ...input,
      url: window.location.href,
      userAgent: navigator.userAgent,
      ...(resolvedReleaseSha !== undefined ? { releaseSha: resolvedReleaseSha } : {}),
    }
    void fetch(`${REPORTING.origin}/api/errors`, {
      method: "POST",
      keepalive: true,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(report),
    }).catch(() => undefined)
  } catch {}
}
