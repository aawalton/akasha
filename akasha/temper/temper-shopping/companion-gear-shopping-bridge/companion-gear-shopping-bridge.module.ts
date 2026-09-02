import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionGearShoppingBridge = {
  id: "01a060cf-b0b2-743e-9d82-ea94a110b9cb",
  pageTypeSlug: "module",
  slug: "companion-gear-shopping-bridge",
  definition: "a piece of companion gear a build wants turned into something to shop for",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The gear a build wants is stated here as the fields this module reads.",
    },
    {
      invariantKind: "gap",
      statement: "Where a gear need is worked out is a package akasha has yet to hold.",
    },
    {
      invariantKind: "departure",
      statement: "Four fields of a need together make the key one recommendation comes back under.",
    },
    {
      invariantKind: "departure",
      statement: "A need Tamriel Trade Centre knows no item for answers with nothing.",
    },
    {
      invariantKind: "departure",
      statement: "Armour narrows a search by weight where jewellery and a weapon do not.",
    },
  ],
} as const satisfies Module
