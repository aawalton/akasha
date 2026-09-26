import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const loreFacts = {
  id: "01a0deeb-9c4e-7516-894d-7586de664d47",
  type: "page-type/record-property",
  slug: "lore-facts",
  propertySlug: "facts",
  definition: "the statements a piece of lore makes about its world, each with who knows it",
  properties: [
    { pageProperty: "text-property/lore-fact", required: true, many: false },
    {
      pageProperty: "multi-relation-property/lore-knowers",
      required: true,
      many: true,
      maxCount: null,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every fact here names at least one knower.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fact no one but the world builder knows is in the page's secrets instead.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
