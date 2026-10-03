import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const beatMemory = {
  id: "01a10289-87d7-7d12-a837-2bf21fcf6c11",
  type: "page-type/module",
  slug: "beat-memory",
  definition:
    "who learns which fact in each beat, which facts the reader is shown, and which are new",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A memory is one json line naming its beat, a lore page and a fact word for word.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A memory says a character learns the fact, the reader is shown it, or it is new.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The player's character learns a fact as any other character does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Showing the reader a fact is no character learning it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A fact the world builder wrote stays the world builder's, and only its knowers grow.",
    },
  ],
} as const satisfies Module
