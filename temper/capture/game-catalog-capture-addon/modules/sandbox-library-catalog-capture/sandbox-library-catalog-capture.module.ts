import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const sandboxLibraryCatalogCapture = {
  id: "01a0d8ad-68a6-78fc-80fe-f3d095c8b8e4",
  type: "page-type/module",
  slug: "sandbox-library-catalog-capture",
  definition: "the collector reading what the game's Lua sandbox leaves of Lua's standard library",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The standard globals and libraries are asked for by name rather than walked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The names asked for are every standard global from Lua 5.1 through Lua 5.4.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every member a library holds under a name is listed, whatever it holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The sandbox is read as this add-on loads rather than when the catalog runs.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "An add-on loaded before this one can already have added to a library.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes to the sandbox it reads.",
    },
  ],
} as const satisfies Module
