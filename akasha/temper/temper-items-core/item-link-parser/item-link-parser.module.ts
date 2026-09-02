import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const itemLinkParser = {
  id: "01a060bf-747c-74be-8914-30e2ea6cabe8",
  pageTypeSlug: "module",
  slug: "item-link-parser",
  definition: "the fields an item link carries, read out by their place in it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each field's place in the link is named once here.",
    },
    {
      invariantKind: "departure",
      statement: "A link carrying fewer fields than the game's shortest form parses to nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A field holding no number reads as zero.",
    },
  ],
} as const satisfies Module
