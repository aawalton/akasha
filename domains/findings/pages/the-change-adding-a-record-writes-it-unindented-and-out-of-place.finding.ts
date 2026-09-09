import type { Finding } from "../finding.page-type.types.ts"

export const theChangeAddingARecordWritesItUnindentedAndOutOfPlace = {
  id: "01a087be-e21a-7989-b927-22c3f772e870",
  pageTypeSlug: "finding",
  slug: "the-change-adding-a-record-writes-it-unindented-and-out-of-place",
  domain: "workspace-package/change",
  claim:
    "The mechanical change adding a record to a page writes that record unindented and after the value the page states last, rather than among the records it belongs with. An agent then mends by hand what a mechanical change wrote.",
  evidence:
    "A subagent adding one invariant to a change-agent page met this twice in one session, and each time needed a second run to indent the record and carry it back among the invariants. `add-property-record` is the change reached. Akasha holds that a fault a mechanical change lands is a fault in the program that composed the change, so the mending belongs in that change rather than in each caller.",
} as const satisfies Finding
