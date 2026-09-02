import type { Module } from "@akasha/code-system/module"

export const tsLuaSerializer = {
  id: "01a06038-2cc0-7ae7-b7d4-dad6f274caff",
  pageTypeSlug: "module",
  slug: "ts-lua-serializer",
  definition: "the Lua a Lua machine loads to write a table out as a TypeScript literal",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The serializer is Lua source held in TypeScript rather than a Lua file.",
    },
    {
      invariantKind: "departure",
      statement: "Keys are written in a settled order so a rerun writes the same bytes.",
    },
    {
      invariantKind: "departure",
      statement: "A number is written in the shortest spelling that reads back as the same number.",
    },
    {
      invariantKind: "departure",
      statement: "A value the serializer has no spelling for stops the run.",
    },
  ],
} as const satisfies Module
