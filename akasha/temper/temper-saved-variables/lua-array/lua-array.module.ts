import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const luaArray = {
  id: "01a06053-3636-7157-ade2-a72c0d19b41c",
  pageTypeSlug: "module",
  slug: "lua-array",
  definition: "a schema reading a Lua list the file may have written keyed or unkeyed",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A record put in place of a list keeps the order its keys were written in.",
    },
    {
      invariantKind: "departure",
      statement: "An item's key goes at the head of the path an error names.",
    },
    {
      invariantKind: "constraint",
      statement: "One item failing fails the whole list.",
    },
  ],
} as const satisfies Module
