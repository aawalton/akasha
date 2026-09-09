import type { PageAddressKind } from "../page-address-kind.page-type.ts"

export const inPageProperty = {
  id: "01a0731d-f940-7d5d-ade6-7b2d21f69025",
  pageTypeSlug: "page-address-kind",
  type: "page-address-kind",
  slug: "in-page-property",
  definition: "an address naming a page by a value unique among the pages sharing a property value",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This kind answers the unique kind `page-property`.",
    },
    {
      invariantKind: "departure",
      statement: "The index answers this kind under the page type and then the scope.",
    },
    {
      invariantKind: "departure",
      statement: "A scope is the scope property's name followed by the scope property's value.",
    },
    {
      invariantKind: "departure",
      statement: "The scope is the value the property a declaration's `uniqueProperty` names has.",
    },
    {
      invariantKind: "departure",
      statement: "That property is declared on the same page type.",
    },
    {
      invariantKind: "departure",
      statement: "That property is required and has one value.",
    },
    {
      invariantKind: "departure",
      statement: "A scope is any kind of page property rather than a relation alone.",
    },
    {
      invariantKind: "departure",
      statement: "A page has one address of this kind.",
    },
  ],
} as const satisfies PageAddressKind
