import type { ErrorReport } from "akasha/alan/harness/errors-core/modules/error-report/error-report.module.code.ts"

export type ReportErrorInput = Omit<ErrorReport, "url" | "userAgent">

const SINK_AT = "/api/errors"

export function reportError(input: ReportErrorInput): undefined {
  if (typeof window === "undefined") return
  try {
    const report: ErrorReport = {
      ...input,
      url: window.location.href,
      userAgent: navigator.userAgent,
    }
    void fetch(SINK_AT, {
      method: "POST",
      keepalive: true,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(report),
    }).catch(() => undefined)
  } catch {}
}
