import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const distributableSet = {
  id: "01a06060-ec3f-72a0-9eb4-c159dfd1784e",
  type: "module",
  slug: "distributable-set",
  definition: "which addons a release carries and which addons a release leaves to the player",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An addon named in the set being released is carried.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A dependency on an addon outside the set is left to the player.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An optional dependency counts the same as a required dependency.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A version floor written after the name is cut off before the name is matched.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Both lists are answered in sorted order.",
    },
  ],
} as const satisfies Module
