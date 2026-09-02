import type { Finding } from "../finding.page-type.ts"

export const theGroupSortOrderIsUnreadInAkashaAndItsDefaultContradictsTheReader = {
  id: "01a0641a-d59b-7c62-8812-dfdd279d6935",
  pageTypeSlug: "finding",
  slug: "the-group-sort-order-is-unread-in-akasha-and-its-default-contradicts-the-reader",
  domainSlug: "workspace-package/readout-system",
  claim:
    "akasha's only group reader sorts by place unconditionally, so `sortOrder` is declared and unread there. The page type defaults it to `label`. For the three groups declaring no sort order, safety, surplus and categorization, that default contradicts what the reader does, so anyone making `sortOrder` live flips those three from place order to label order without meaning to.",
  evidence:
    'Measured 2026-09-02 while carrying `sortOrder` and `sequenceSlugs` onto the inboxes, upkeep and values groups at `9bd7b18e49`.\n\n`akasha/readout-system/readout-group-serving/readout-group-serving.module.code.ts:119` calls `inPlaceOrder(asked.rows)` unconditionally, and `inPlaceOrder` at line 48 sorts on `place` alone. Nothing under `akasha/` reads `sortOrder` or `sequenceSlugs`: a grep over the whole subtree answers only the two property pages, the page type, and the group pages declaring values.\n\n`akasha/readout-system/readout-groups/readout-group.page-type.ts:31` declares sort-order with `default: "label"`. So the declared default and the actual behaviour disagree for every group stating no sort order, which is `safety`, `surplus` and `categorization`.\n\nThe markdown engine does read it. `readouts/readout-resolver.ts:264` is a comparison falling back to label order unless the group states place, reached from `drawnOrder` at line 203, and the markdown groups already declared place, so the two engines agree today.\n\nThe carry was checked inert at the reader, though only after it had landed rather than before. For each group the markdown sequence and the order `inPlaceOrder` produces are the same list: upkeep is safety, surplus, capacity, plants, activity and sleep against places 1 to 6; values is faith, love, health, learn, fun and wealth against places 1 to 6; inboxes is email, tasks, temper-tasks and texts against places 1 to 4.',
} as const satisfies Finding
