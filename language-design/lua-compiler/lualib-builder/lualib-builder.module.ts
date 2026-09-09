import type { Module } from "@akasha/code/module"

export const lualibBuilder = {
  id: "01a06758-8e5e-7000-a6a2-355e374cf411",
  pageTypeSlug: "module",
  type: "module",
  slug: "lualib-builder",
  definition: "the lualib TypeScript sources built into per-feature Lua code and a bundle",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A source file's name reaches its feature by what the lualib pages say.",
    },
    {
      invariantKind: "departure",
      statement: "An import of another source file names that file's feature as a dependency.",
    },
  ],
} as const satisfies Module
