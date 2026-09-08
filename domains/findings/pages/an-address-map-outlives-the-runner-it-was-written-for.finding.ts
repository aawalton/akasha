import type { Finding } from "../finding.page-type.ts"

export const anAddressMapOutlivesTheRunnerItWasWrittenFor = {
  id: "01a081cd-0cb7-7579-9073-ed4e5aa98bf9",
  pageTypeSlug: "finding",
  slug: "an-address-map-outlives-the-runner-it-was-written-for",
  domainSlug: "workspace-package/command-system",
  claim:
    "An address map whose runner page is gone is written by nothing and removed by nothing, so it stays.",
  evidence:
    "`writtenAgain` in command-system/address-mapping reads only the path: page type `change-runner`, one section `addressed`. `folding` in commands/modules/apply-running drops every edit carrying such a path, saying the body is written again on every apply. For an orphan that is false, because `mappedOver` writes a map only for a runner the index holds. changes/runners/pages/change-running/change-running.change-runner.addressed.ts is the case: commit 7a2135bd9b renamed that runner to agent-change-running and added mechanical-change-running, and the index holds those two and no change-running. The same guard dropped the removal at the rename, which is how the file was left. Its 18 addresses are all among agent-change-running's 24, so nothing is lost by removing it, and no hand can.",
} as const satisfies Finding
