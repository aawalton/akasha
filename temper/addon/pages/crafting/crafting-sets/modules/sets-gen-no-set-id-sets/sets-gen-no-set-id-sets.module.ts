import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsGenNoSetIdSets = {
  id: "01a061d7-7bcd-7e34-9bc0-f2daafdd16c4",
  type: "page-type/module",
  slug: "sets-gen-no-set-id-sets",
  definition: "the sets the game names without giving a set id",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This table is ported from the upstream library at a pinned commit.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The table is empty at the pinned commit.",
    },
  ],
} as const satisfies Module
