import type { PageAddressKind } from "akasha/page/address-kind/page-address-kind.page-type.types.ts"

export const inPageProperty = {
  id: "01a0731d-f940-7d5d-ade6-7b2d21f69025",
  type: "page-type/page-address-kind",
  slug: "in-page-property",
  definition: "an address naming a page by a value unique among the pages sharing a property value",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This kind answers the unique kind `page-property`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The index answers this kind under the page type and then the scope.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A scope is the scope property's name followed by the scope property's value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The scope is the value the property a declaration's `uniqueProperty` names has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That property is declared on the same page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That property is required and has one value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A scope is any kind of page property rather than a relation alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page has one address of this kind.",
    },
  ],
} as const satisfies PageAddressKind
