import type { Module } from "@akasha/code-system/module"

export const pageAddress = {
  id: "01a04b14-4355-7352-9c98-ad67e309f5f6",
  pageTypeSlug: "module",
  slug: "page-address",
  definition: "what form a relation value takes when it names a page",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page type and a slug are cut at the first `/`.",
    },
    {
      invariantKind: "departure",
      statement: "A slug carries no slash, because a slug is lower kebab case.",
    },
    {
      invariantKind: "departure",
      statement: "A third part names the collection a slug is unique within.",
    },
    {
      invariantKind: "departure",
      statement: "An address naming a page by id carries no slug.",
    },
    {
      invariantKind: "departure",
      statement: "The shape an id is judged by is the lower uuid format's own.",
    },
    {
      invariantKind: "departure",
      statement: "A bare address is refused, what it names being read off whoever asked.",
    },
    {
      invariantKind: "departure",
      statement:
        "An address naming its parent by a slug is refused, a slug naming pages of many types.",
    },
  ],
} as const satisfies Module
