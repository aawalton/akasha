import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type Mode = string

export const mode = {
  id: "01a07661-4b8c-7ac8-ba3a-9cbd32e9ae55",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "mode",
  propertySlug: "mode",
  definition: "the mode an agent in a seat is running in",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat's mode is observed of the supervisor with the seat.",
    },
    {
      invariantKind: "departure",
      statement:
        "The mode a seat is running in is told apart from the mode that seat was started in.",
    },
    {
      invariantKind: "departure",
      statement: "A seat no supervisor has written a mode for has no mode.",
    },
    {
      invariantKind: "stopgap",
      statement: "The modes a seat can run in are no pages.",
    },
  ],
} as const satisfies TextProperty
