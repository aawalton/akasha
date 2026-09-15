import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageAddress = {
  id: "01a04b14-4355-7352-9c98-ad67e309f5f6",
  type: "module",
  slug: "page-address",
  definition: "what form a relation value takes when it names a page",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "This module has the union of every address kind.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A kind left out of the union does not compile.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Where the index files an address is asked of the kind that address is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An address names the property a value is read by.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No address names a page by a value alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A slug names pages of many types.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An address is named here as well as read here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An address named with a scope reads back as the scoped kind.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Which scope a page carries is answered by whoever names that page's address.",
    },
  ],
} as const satisfies Module
