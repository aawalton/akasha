import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const towerHudBeside = {
  id: "01a0caa1-3b85-7160-a0ab-7a7fa5d9615c",
  type: "page-type/module",
  slug: "tower-hud-beside",
  definition: "the level and attribute points filed beside the character a game's hud draws",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The counts answered are the counts filed beside one character and beside no other.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The character asked after is the player the game being drawn names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A level and a count of attribute points are asked after together.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row whose count is no number is left out rather than answered as nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read for one game is dropped where the game asked after changes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A game naming no player of its own is answered no count.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read still outstanding is answered apart from a read answering no count.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The level filed beside the character is drawn over the level a panel kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A panel holding no level of its own draws nothing while the read is still outstanding.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a page.",
    },
  ],
} as const satisfies Module
