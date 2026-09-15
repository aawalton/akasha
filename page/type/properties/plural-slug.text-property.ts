import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const pluralSlug = {
  id: "01a0a5ae-a36e-7000-b147-642bd48aac2a",
  type: "text-property",
  slug: "plural-slug",
  propertySlug: "plural-slug",
  definition: "the name many pages of a page type are gathered under",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type states this where many of its pages are gathered under one name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The plural is stated here rather than worked out from the slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type whose pages are gathered nowhere states nothing here.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A folder shape naming a page type's plural still spells that plural itself.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
