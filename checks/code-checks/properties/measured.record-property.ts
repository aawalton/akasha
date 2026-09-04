import type { RecordProperty } from "@akasha/pages-system/record-property"
import type { AtCommit } from "./at-commit.text-property.ts"
import type { OnePathBytes } from "./one-path-bytes.number-property.ts"
import type { OnePathMs } from "./one-path-ms.number-property.ts"
import type { WholeTreeBytes } from "./whole-tree-bytes.number-property.ts"
import type { WholeTreeMs } from "./whole-tree-ms.number-property.ts"

export type Measured = {
  atCommit: AtCommit
  onePathMs: OnePathMs
  onePathBytes: OnePathBytes
  wholeTreeMs: WholeTreeMs
  wholeTreeBytes: WholeTreeBytes
}

export const measured = {
  id: "01a06e1e-6a54-7ff3-8b90-3148cfb8cafd",
  pageTypeSlug: "record-property",
  slug: "measured",
  propertySlug: "measured",
  definition: "what one run of a check cost, and the commit it was measured at",
  properties: [
    { pagePropertySlug: "at-commit", required: true, many: false },
    { pagePropertySlug: "one-path-ms", required: true, many: false },
    { pagePropertySlug: "one-path-bytes", required: true, many: false },
    { pagePropertySlug: "whole-tree-ms", required: true, many: false },
    { pagePropertySlug: "whole-tree-bytes", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A figure here is one run rather than a mean over several runs.",
    },
    {
      invariantKind: "departure",
      statement: "A figure here is undone by a change to the code the figure was measured over.",
    },
    {
      invariantKind: "departure",
      statement: "The commit that code was at is recorded beside the figures it gave.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says whether the commit recorded is the newest one.",
    },
  ],
} as const satisfies RecordProperty
