import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const towerAttributesBeside = {
  id: "01a0ca95-36dc-7908-a56d-519aeb5449e3",
  type: "page-type/module",
  slug: "tower-attributes-beside",
  definition: "the attribute scores filed beside the character a game's panel draws",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The scores answered are the scores filed beside one character and beside no other.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The character asked after is the player the game being drawn names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An attribute is named by the page type its own page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row whose score is no number is left out rather than answered as nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The scores are answered in the order the names they carry sort.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read for one game is dropped where the game asked after changes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A game naming no player of its own is answered no score.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read still outstanding is answered apart from a read answering no score.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A panel holding no score of its own draws nothing while the read is still outstanding.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a page.",
    },
  ],
} as const satisfies Module
