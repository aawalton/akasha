import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const argumentDefault = {
  id: "01a09525-5796-7b0c-81b0-2d1c6a0c8eb9",
  type: "page-type/text-property",
  slug: "argument-default",
  propertySlug: "default",
  definition: "what an argument carries where no call says it",
  maxLength: 60,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The value is written as a call would say it, and read as a said value is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An argument carrying no value states none here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An argument stating one is always answered, as one a command needs is.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
