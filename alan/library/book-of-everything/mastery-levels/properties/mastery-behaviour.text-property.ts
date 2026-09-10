import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type MasteryBehaviour = string

export const masteryBehaviour = {
  id: "01a0784a-cdba-7f44-8b2a-45ca64505638",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "mastery-behaviour",
  propertySlug: "behaviour",
  definition: "what Alan does in an interview at a rung",
  maxLength: 400,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "One rung is told from the rungs beside that rung by this text alone.",
    },
  ],
} as const satisfies TextProperty
