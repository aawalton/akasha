import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const loreSchema = {
  id: "01a05b71-e544-707d-b1c9-5e79b6e55bb6",
  pageTypeSlug: "module",
  slug: "lore-schema",
  definition: "a fact drawn out of a published turn and filed under what it is about",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A citation's quote appears word for word in the turn the citation cites.",
    },
    {
      invariantKind: "departure",
      statement: "A turn edited after that turn was read for lore is read again.",
    },
  ],
} as const satisfies Module
