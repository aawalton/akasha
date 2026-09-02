import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const luaParser = {
  id: "01a06053-3635-710f-8f31-18095cf8a395",
  pageTypeSlug: "module",
  slug: "lua-parser",
  definition: "the text of a saved-variables file read into plain data",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The scan is written by hand rather than handed to a Lua runtime.",
    },
    {
      invariantKind: "departure",
      statement: "A comment is skipped wherever a value could begin.",
    },
    {
      invariantKind: "departure",
      statement: "A long-bracket comment is skipped whole.",
    },
    {
      invariantKind: "constraint",
      statement: "A table whose first entry carries no key is read as an array.",
    },
    {
      invariantKind: "constraint",
      statement: "A table mixing a bare entry with a named key is read as a record.",
    },
    {
      invariantKind: "departure",
      statement: "The first entry of a Lua array is renumbered on the way out.",
    },
    {
      invariantKind: "departure",
      statement: "A `nil` in the file is read as null.",
    },
    {
      invariantKind: "constraint",
      statement: "A named variable whose value is no table is refused.",
    },
  ],
} as const satisfies Module
