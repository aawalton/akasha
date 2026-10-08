import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const observationMerging = {
  id: "01a0680d-8b27-7000-b34e-0480ba0f1ccb",
  type: "page-type/module",
  slug: "observation-merging",
  definition:
    "one observation folded onto the last, and the worst sweep kept across every sweep so far",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A patch has no time of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A merged observation is stamped with the time the merge was given.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A patch field holding undefined leaves the value already there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Counts are merged key by key rather than replaced whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An outcome given with no failure drops the failure that was there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A first observation is the patch with a time on that patch.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sweep's worst is beaten only by a longer sweep.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The worst sweep's time and trigger move together with its length.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every count but the worst is taken from the sweep just done.",
    },
  ],
  createdAt: "2026-09-03T16:15:13.191Z",
  updatedAt: "2026-09-15T18:33:01.000Z",
} as const satisfies Module
