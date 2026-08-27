import type { ErrorReport } from "../../errors-core/src/schema"

export type ReportErrorInput = Omit<ErrorReport, "url" | "userAgent">

let reportOrigin = ""

export function setErrorReportOrigin(origin: string): undefined {
  reportOrigin = origin
  return undefined
}

let reportReleaseSha = ""

export function setReleaseSha(sha: string): undefined {
  reportReleaseSha = sha
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
    const resolvedReleaseSha = resolveReportReleaseSha(input.releaseSha, reportReleaseSha)
    const report: ErrorReport = {
      ...input,
      url: window.location.href,
      userAgent: navigator.userAgent,
      ...(resolvedReleaseSha !== undefined ? { releaseSha: resolvedReleaseSha } : {}),
    }
    void fetch(`${reportOrigin}/api/errors`, {
      method: "POST",
      keepalive: true,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(report),
    }).catch(() => undefined)
  } catch {}
}
