import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersArmoryWindow = {
  id: "01a198da-8336-78fc-9ae6-c6db8bc9b299",
  type: "page-type/module",
  slug: "characters-armory-window",
  definition: "the Temper Armory, the game's Armory window over a character's Temper builds",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The window is laid out, shown and heard as the game's Armory window is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The window lists the character's target builds, each collapsed but the one chosen.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The build chosen when the window first opens is the build the character is set up as.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The entry the game uses to unlock a slot saves the character as a new build.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The window opens from a key and from a slash command, anywhere.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change made in the game that was not kept is said in chat once the game loads.",
    },
  ],
  createdAt: "2026-11-01T20:43:39.700Z",
  updatedAt: "2026-11-01T20:43:39.700Z",
} as const satisfies Module
