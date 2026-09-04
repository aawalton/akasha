import type { Module } from "@akasha/code-system/module"

export const asJson = {
  id: "01a05cc0-fc8b-72c7-b9e9-7a512a9927d8",
  pageTypeSlug: "module",
  slug: "as-json",
  definition: "a value called json without being read to see whether it is",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Nothing here reads the value this module renames.",
    },
    {
      invariantKind: "departure",
      statement: "A caller wanting the value read names `is-json` instead.",
    },
  ],
} as const satisfies Module
