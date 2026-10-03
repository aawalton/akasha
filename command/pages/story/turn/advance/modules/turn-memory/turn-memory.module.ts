import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnMemory = {
  id: "01a10292-b21c-717d-b28a-458f7ec0db75",
  type: "page-type/module",
  slug: "turn-memory",
  definition: "a turn or chapter's memory, checked as handed in and told onto its lore at player",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn's memory is read from its beats file, each beat's memory on its line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A memory recorder's memory is checked against the lore as it hands it in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The lore's knowers grow only as the turn moves to player, in that one landing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fact learned by one who knows it already, or shown alone, is told nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each fact is told as the story tell command tells it.",
    },
  ],
} as const satisfies Module
