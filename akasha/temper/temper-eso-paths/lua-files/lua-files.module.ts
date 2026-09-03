import type { Module } from "@akasha/code-system/module"

export const luaFiles = {
  id: "01a06919-a938-7c99-866b-0f9382740997",
  pageTypeSlug: "module",
  slug: "lua-files",
  definition: "every Lua file under a directory, however deep it sits",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A directory that cannot be read answers with no files.",
    },
    {
      invariantKind: "departure",
      statement: "An entry that cannot be examined is left out rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "A file is answered as the path it was found at.",
    },
  ],
} as const satisfies Module
