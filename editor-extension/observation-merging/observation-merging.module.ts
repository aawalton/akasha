import type { Module } from "../../code-system/modules/module.page-type.ts"

export const observationMerging = {
  id: "01a0680d-8b27-7000-b34e-0480ba0f1ccb",
  pageTypeSlug: "module",
  type: "module",
  slug: "observation-merging",
  definition:
    "one observation folded onto the last, and the worst sweep kept across every sweep so far",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A patch has no time of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A merged observation is stamped with the time the merge was given.",
    },
    {
      invariantKind: "departure",
      statement: "A patch field holding undefined leaves the value already there.",
    },
    {
      invariantKind: "departure",
      statement: "Counts are merged key by key rather than replaced whole.",
    },
    {
      invariantKind: "departure",
      statement: "An outcome given with no failure drops the failure that was there.",
    },
    {
      invariantKind: "departure",
      statement: "A first observation is the patch with a time on that patch.",
    },
    {
      invariantKind: "departure",
      statement: "A sweep's worst is beaten only by a longer sweep.",
    },
    {
      invariantKind: "departure",
      statement: "The worst sweep's time and trigger move together with its length.",
    },
    {
      invariantKind: "departure",
      statement: "Every count but the worst is taken from the sweep just done.",
    },
  ],
} as const satisfies Module
