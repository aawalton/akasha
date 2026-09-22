import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const slashCommanderInit = {
  id: "01a06066-8404-74f8-810a-0930b5a79f11",
  type: "page-type/module",
  slug: "slash-commander-init",
  definition: "the slash command library loaded whole and hooked into the chat entry",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every part of the library is loaded before the chat entry is hooked.",
    },
  ],
} as const satisfies Module
