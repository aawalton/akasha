import type { Module } from "@akasha/code/module"
import type { PageType } from "../types/page-type.page-type.ts"

export type PageAddressKind = Module

export const pageAddressKind = {
  id: "01a0731d-07e7-77ea-85a1-aac50ce5d3b2",
  pageTypeSlug: "page-type",
  slug: "page-address-kind",
  definition: "a form an address takes when it names a page",
  pluralSlug: "page-address-kinds",
  partSlugs: [
    "page-address-kind/in-page",
    "page-address-kind/in-page-type",
    "page-address-kind/in-page-property",
  ],
  extends: ["page-type/module"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An address by itself finds one page in the index.",
    },
    {
      invariantKind: "departure",
      statement: "Each kind answers one unique kind the identity index files under.",
    },
    {
      invariantKind: "departure",
      statement: "A kind has the code finding the page an address of that kind names.",
    },
    {
      invariantKind: "departure",
      statement: "An address is a structured value rather than a string that is parsed.",
    },
    {
      invariantKind: "departure",
      statement: "An address has every part of the identity path.",
    },
    {
      invariantKind: "departure",
      statement: "Finding a page reads one file.",
    },
  ],
} as const satisfies PageType
