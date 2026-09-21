import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const slashCommanderDescriptions = {
  id: "01a06066-8402-71ee-9ab5-3255338fdd7a",
  type: "page-type/module",
  slug: "slash-commander-descriptions",
  definition: "what each slash command the game itself carries is described and colored as",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A built-in command's description is written here rather than read from the game.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An emote is described by the display name the game gives that emote.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A channel switch whose name changes is described by a call rather than a string.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every command the game has is put into a kind.",
    },
  ],
} as const satisfies Module
