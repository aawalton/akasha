import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const actionButtonVerb = {
  id: "01a0c5fb-5db6-7c79-af84-a877d7d23ada",
  type: "page-type/text-property",
  slug: "action-button-verb",
  propertySlug: "verb-id",
  definition: "the verb an action button runs over the page on which it is drawn",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The verb is page data rather than a value a browser holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A button whose verb nothing registered is drawn and refuses to run.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
