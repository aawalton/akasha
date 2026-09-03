import type { FailAttribution } from "../triage-fanout-attribution/triage-fanout-attribution.module.code.ts"
import { UNATTRIBUTED_SECTION } from "../triage-fanout-attribution/triage-fanout-attribution.module.code.ts"
import type { FanoutTriageResult } from "../triage-fanout-log/triage-fanout-log.module.code.ts"

function renderAttribution(attribution: FailAttribution): string {
  if (attribution.kind === "declined") return "[attribution declined]"
  if (attribution.file !== null) return `[file: ${attribution.file}]`
  return `[workspace: ${attribution.workspace ?? UNATTRIBUTED_SECTION}]`
}

export function renderResult(result: FanoutTriageResult): string {
  const evidence = result.evidence
  const out: string[] = [
    `verdict: ${result.kind}`,
    `workspaces seen: ${evidence.workspacesSeen.length}`,
    `expected workspaces: ${evidence.expectedWorkspaces ?? "unknown (no announce line)"}`,
    `clean terminals: ${evidence.cleanTerminals}`,
  ]
  if (evidence.refusals.length > 0) {
    out.push(`refusals (a run that executed no test): ${evidence.refusals.length}`)
    for (const r of evidence.refusals) out.push(`  ${r}`)
  }
  if (result.kind === "fail") {
    const declined = evidence.failLines.filter((l) => l.attribution.kind === "declined").length
    out.push(`total fail count: ${evidence.totalFail}`)
    out.push(
      `attribution: ${evidence.failLines.length - declined} of ${evidence.failLines.length} ` +
        "fail signal(s) located"
    )
    if (declined > 0) {
      out.push(
        `  ${declined} DECLINED: concurrent fan-out workers share one log and these lines ` +
          "carry no producing-process tag, so no file and no workspace can be claimed for " +
          "them. Resolve the owner by grepping the repo for the failing TEST NAME below."
      )
    }
    out.push(
      `failing test file(s): ${
        evidence.failingFiles.length > 0 ? evidence.failingFiles.join(", ") : "(none located)"
      }`
    )
    out.push(
      `failing workspace(s): ${
        evidence.failingWorkspaces.length > 0
          ? evidence.failingWorkspaces.join(", ")
          : "(none located)"
      }`
    )
    out.push("fail evidence:")
    for (const l of evidence.failLines) {
      out.push(`  ${renderAttribution(l.attribution)} ${l.evidence}`)
    }
  }
  if (result.kind === "fail" && evidence.cleanTerminals === 0) {
    out.push(
      `${result.reason}. Re-fetch the COMPLETE pod log — the whole log, not a tail of it — ` +
        "and re-run this triage over it."
    )
  }
  return out.join("\n")
}
