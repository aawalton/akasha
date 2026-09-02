import type { Finding } from "../finding.page-type.ts"

export const aProgressValueCarryingEntriesIsLegalOnlyWhenTheWorkIsDone = {
  id: "01a06423-2306-73a5-8c58-869d9c615ddf",
  pageTypeSlug: "finding",
  slug: "a-progress-value-carrying-entries-is-legal-only-when-the-work-is-done",
  domainSlug: "workspace-package/pages-core",
  claim:
    "A progress value carrying entries and naming no active entry key is refused unless every entry is already complete, so that shape is legal only for work that is finished. Dropping the active entry key to let the top pair describe the roster therefore does not work for a roster in progress, which is the case that occurs. A value carrying no entries at all keeps the roster pair and is always legal.",
  evidence:
    "Measured 2026-09-02 by running `validateProgressValue` from `akasha/pages-system/pages-core/property-types/progress/progress.module.code.ts` over six shapes, rather than by reading it.\n\nEvery entry complete, naming no active entry key: passes. One complete and one partial: refused. Some progress and some none: refused. Every entry at zero: refused. All three refusals answer that without an active entry key every entry must be complete, from lines 72 to 77, naming the first entry that is not.\n\nA value of a current and a total with no entries key: passes, because the check returns early at lines 49 to 52. A value naming an active entry key with no entries: refused, because an active entry key requires entries.\n\nSo the property admits two workable shapes for a roster partly done. One names an active entry key and mirrors the top pair onto that single entry, which costs the roster total. The other carries a bare pair and keeps the rows elsewhere, which costs nothing. It does not admit a roster total beside per-character entries, which is what the legacy cross-character index built.\n\nThis was met while landing the completion index builders. The rows were put in the `progress` page-property-entry that `temper-task` already declares, holding `character-name`, `progress-total`, `progress-current` and `display-order`, the roster pair was left as the scalar pair, and which character is next moved to `effective-character`. That matches what the recreation had already done for 240 rows, recorded in `temper-task-progress-named-characters-by-ids-that-did-not-carry-across`.",
} as const satisfies Finding
