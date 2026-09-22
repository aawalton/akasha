import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const hudComponentRecord = {
  id: "01a060a4-fa39-7073-a59e-f1228678be33",
  type: "page-type/module",
  slug: "hud-component-record",
  definition: "what is known about a part of the game's HUD",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A record names the ESO global the part is reached by.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A record names which of the three HUD scenes show the part.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A record names the line of the game source the part was found on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A record carrying a field beyond the named ones is refused.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a file.",
    },
  ],
} as const satisfies Module
