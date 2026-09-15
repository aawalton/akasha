import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const observationMerging = {
  id: "01a0680d-8b27-7000-b34e-0480ba0f1ccb",
  type: "module",
  slug: "observation-merging",
  definition:
    "one observation folded onto the last, and the worst sweep kept across every sweep so far",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A patch has no time of its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A merged observation is stamped with the time the merge was given.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A patch field holding undefined leaves the value already there.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Counts are merged key by key rather than replaced whole.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An outcome given with no failure drops the failure that was there.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A first observation is the patch with a time on that patch.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A sweep's worst is beaten only by a longer sweep.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The worst sweep's time and trigger move together with its length.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every count but the worst is taken from the sweep just done.",
    },
  ],
} as const satisfies Module
