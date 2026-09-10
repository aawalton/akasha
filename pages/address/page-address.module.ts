import type { Module } from "@akasha/code/module"

export const pageAddress = {
  id: "01a04b14-4355-7352-9c98-ad67e309f5f6",
  pageTypeSlug: "module",
  type: "module",
  slug: "page-address",
  definition: "what form a relation value takes when it names a page",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This module has the union of every address kind.",
    },
    {
      invariantKind: "departure",
      statement: "A kind left out of the union does not compile.",
    },
    {
      invariantKind: "departure",
      statement: "Where the index files an address is asked of the kind that address is.",
    },
    {
      invariantKind: "departure",
      statement: "An address names the property a value is read by.",
    },
    {
      invariantKind: "absence",
      statement: "No address names a page by a value alone.",
    },
    {
      invariantKind: "departure",
      statement: "A slug names pages of many types.",
    },
    {
      invariantKind: "departure",
      statement: "An address is named here as well as read here.",
    },
    {
      invariantKind: "departure",
      statement: "An address named with a scope reads back as the scoped kind.",
    },
    {
      invariantKind: "absence",
      statement: "Which scope a page carries is answered by whoever names that page's address.",
    },
  ],
} as const satisfies Module
