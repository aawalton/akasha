import type { Module } from "@akasha/code-system/module"
import type { PageType } from "../types/page-type.page-type.ts"

export type PageAddressKind = Module

export const pageAddressKind = {
  id: "01a0731d-07e7-77ea-85a1-aac50ce5d3b2",
  pageTypeSlug: "page-type",
  slug: "page-address-kind",
  definition: "a form an address takes when it names a page",
  pluralSlug: "page-address-kinds",
  partSlugs: [
    "page-address-kind/by-id",
    "page-address-kind/in-page-type",
    "page-address-kind/in-part-of",
  ],
  extendsSlug: ["page-type/module"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An address by itself finds one page in the index.",
    },
    {
      invariantKind: "departure",
      statement: "Each kind answers one reach a unique property is filed under.",
    },
    {
      invariantKind: "departure",
      statement: "A kind holds the code recognising an address of that kind.",
    },
    {
      invariantKind: "absence",
      statement: "No address is told apart by counting the slashes a string carries.",
    },
  ],
} as const satisfies PageType
