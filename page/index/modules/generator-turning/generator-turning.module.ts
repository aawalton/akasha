import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const generatorTurning = {
  id: "01a0c56e-254b-73b1-bdd7-580d3e3d7d5e",
  type: "page-type/module",
  slug: "generator-turning",
  definition: "every file the change generators write, worked out again from the pages",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every change generator answers here, whatever a change would have turned.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The change the generators are handed moves nothing, so they read the tree as it is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A generator that broke is refused rather than passed over as nothing differing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file the generators write is put in place whole, as the index's own files are.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file a change generator takes away is taken off the disk.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here weighs a file no generator writes.",
    },
  ],
} as const satisfies Module
