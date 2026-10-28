import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersBuildBars = {
  id: "01a18445-63e2-79b0-b525-1660f1845bcb",
  type: "page-type/module",
  slug: "characters-build-bars",
  definition: "slotting a character's target skills on the front and back bars",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill is slotted through the game's own bar manager, which sends the change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slot is matched by the name the game shows for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill not bought, or bought in another morph, is named rather than slotted.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here buys a skill, morphs a skill or scribes a skill.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A scribed skill is named rather than slotted, since its target has no ability id.",
    },
  ],
  createdAt: "2026-10-28T20:48:22.497Z",
  updatedAt: "2026-10-28T20:48:22.497Z",
} as const satisfies Module
