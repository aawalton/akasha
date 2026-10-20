import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersAdvancedSheet = {
  id: "01a15914-c8bb-7852-9ff3-24f2e4cd67c3",
  type: "page-type/module",
  slug: "characters-advanced-sheet",
  definition: "each advanced stat the game's Advanced Stats sheet shows, as the game gives it now",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The stats read are the ones the game's panel lists, category by category.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The panel is walked through the same calls the game's panel builds itself from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each stat is named by its display type, lowercased and hyphenated.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A stat whose display type has no name here is named by the display type's number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each stat keeps its category's header and its name as the panel shows them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each stat keeps the display format the game gives it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each stat keeps its flat value and its percent where the game gives each.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A percent is kept as the game gives it rather than as a fraction.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two readings of the sheet agree where every stat's flat value and percent agree.",
    },
  ],
  createdAt: "2026-10-20T11:31:36.762Z",
  updatedAt: "2026-10-20T13:20:51.225Z",
} as const satisfies Module
