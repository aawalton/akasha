import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const landingEntangling = {
  id: "01a0d999-10f8-7e1a-9acf-ad30c2d0558f",
  type: "page-type/module",
  slug: "landing-entangling",
  definition: "a change refused where HEAD moved under its checks and the move reaches its files",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "Two changes each clean against its own commit can break HEAD together.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "HEAD is read again under the lock and weighed against the commit judged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where HEAD moved, a change is refused where it and what moved reach one another.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file that merely imports both what moved and the change refuses nothing.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "A file reaches a path it imports however far, as the index at HEAD says.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A changed file's own imports are read from the body the change leaves.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "So an import the change adds is followed though the index lacks it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path taken away and an export taken away or renamed are each a move.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only compiled code is followed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing is followed where HEAD did not move.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Such a refusal writes nothing, and an apply judges the change again at HEAD.",
    },
  ],
} as const satisfies Module
