import type { Finding } from "../finding.page-type.ts"

export const anEntryFilesRowsAreJudgedAtAuditRatherThanAsTheyLand = {
  id: "01a05fcc-89cf-71f7-9240-c4454b6ca686",
  pageTypeSlug: "finding",
  slug: "an-entry-files-rows-are-judged-at-audit-rather-than-as-they-land",
  domainSlug: "workspace-package/checks",
  claim:
    "A change carrying an entry file lands whatever the rows say. What judges a row against the fields its shape declares runs over the page beside it, and a writer learns the rows were wrong only at the next audit, which may be after many thousands of them have landed.",
  evidence:
    "Measured on 2026-09-01. Rewriting `impenetrable.temper-armor-trait.effects.jsonl` to key a field `metric-id` where the shape declares `metricId` was answered `9 checks passed over the 1 path asked for`. The same rows were refused at audit as `states \\`effects metric-id\\`, which \\`effects\\` does not declare`. `page-matches-its-type` walks `change.changed` and skips every path where `pageNamed(path, pageTypes)` is false, and an entry file is not a page, so a change carrying only the entry file is judged by nothing. Handing the page and its entry file to one write was also answered as passing, and the same page refused at the following audit, so the page being in the change is not enough either. The temper recreation is landing 164,071 rows across 14 page types, and a whole cluster can be written wrong before anything says so. `page-property-entry` already carries the gap `Every entry is judged against the fields its shape declares`; this says where the hole is.",
} as const satisfies Finding
