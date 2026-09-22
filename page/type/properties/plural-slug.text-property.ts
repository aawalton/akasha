import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const pluralSlug = {
  id: "01a0a5ae-a36e-7000-b147-642bd48aac2a",
  type: "page-type/text-property",
  slug: "plural-slug",
  propertySlug: "plural-slug",
  definition: "the name under which many pages of a page type are filed",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type states this where many of its pages are gathered under one name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The plural is stated here rather than worked out from the slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type whose pages are gathered nowhere states nothing here.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A folder shape naming a page type's plural still spells that plural itself.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
