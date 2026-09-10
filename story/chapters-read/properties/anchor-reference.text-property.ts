import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type AnchorReference = string

export const anchorReference = {
  id: "01a0685e-ef8a-76f9-a66e-01a05c60c791",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "anchor-reference",
  propertySlug: "reference",
  definition: "what an anchor is read against",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A reference is the chapter's start or the scene before or an absolute date or a named event.",
    },
    {
      invariantKind: "departure",
      statement: "A reference to a named event has that event's slug after `named-event:`.",
    },
  ],
} as const satisfies TextProperty
