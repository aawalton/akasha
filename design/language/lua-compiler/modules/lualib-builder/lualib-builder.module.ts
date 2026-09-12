import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const lualibBuilder = {
  id: "01a06758-8e5e-7000-a6a2-355e374cf411",
  type: "module",
  slug: "lualib-builder",
  definition: "the lualib TypeScript sources built into per-feature Lua code and a bundle",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The lualib pages say which feature a source file's name reaches.",
    },
    {
      invariantKind: "departure",
      statement: "An import of another source file names that file's feature as a dependency.",
    },
    {
      invariantKind: "departure",
      statement: "An import of a file the pages replace resolves to the file taken instead.",
    },
  ],
} as const satisfies Module
