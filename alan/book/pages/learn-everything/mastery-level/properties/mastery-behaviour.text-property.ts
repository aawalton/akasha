import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const masteryBehaviour = {
  id: "01a0784a-cdba-7f44-8b2a-45ca64505638",
  type: "page-type/text-property",
  slug: "mastery-behaviour",
  propertySlug: "behaviour",
  definition: "what Alan does in an interview at a mastery level",
  maxLength: 400,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One rung is told from the rungs beside that rung by this text alone.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-06T19:56:03.386Z",
  updatedAt: "2026-10-30T14:57:56.124Z",
} as const satisfies TextProperty
