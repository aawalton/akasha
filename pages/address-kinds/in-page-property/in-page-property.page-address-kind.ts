import type { PageAddressKind } from "../page-address-kind.page-type.ts"

export const inPageProperty = {
  id: "01a0731d-f940-7d5d-ade6-7b2d21f69025",
  pageTypeSlug: "page-address-kind",
  slug: "in-page-property",
  definition: "an address naming a page by a value unique among the pages sharing a property value",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The index answers this kind under the page type and then the parent.",
    },
    {
      invariantKind: "departure",
      statement: "This kind answers the level `part-of`.",
    },
    {
      invariantKind: "departure",
      statement:
        "The parent is the value the property a declaration's `partOfScope` names carries.",
    },
    {
      invariantKind: "departure",
      statement: "That property is required and carries one value.",
    },
    {
      invariantKind: "departure",
      statement: "The part-of edge is a spanning tree.",
    },
    {
      invariantKind: "departure",
      statement: "That property declares the parent's page type.",
    },
    {
      invariantKind: "departure",
      statement: "The address carries no page type for the parent.",
    },
    {
      invariantKind: "departure",
      statement: "A page has one address of this kind.",
    },
  ],
} as const satisfies PageAddressKind
