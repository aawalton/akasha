import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const sandboxLibraryCatalog = {
  id: "01a0d8ad-68a6-7dd5-9067-31055f0af0f4",
  type: "page-type/module",
  slug: "sandbox-library-catalog",
  definition: "the shape the game's Lua sandbox is written in, as the game leaves that sandbox",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each standard global is kept with the Lua type the game answers for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A global the game leaves out is kept with the type `nil` rather than dropped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each standard library the game keeps is kept with the names of its members.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The API version the game answers with is kept beside what the game left.",
    },
  ],
} as const satisfies Module
