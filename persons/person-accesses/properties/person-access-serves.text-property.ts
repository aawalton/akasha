import type { TextProperty } from "@akasha/pages/text-property"

export type Serves = string

export const personAccessServes = {
  id: "01a05430-c0ef-7fbe-8836-045d9e351ad7",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "person-access-serves",
  propertySlug: "serves",
  definition: "the shared page type the target represents",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A target serves a page type only where that target is a person's own copy of that page type.",
    },
    {
      invariantKind: "stopgap",
      statement: "No page type served by a target exists as a page.",
    },
    {
      invariantKind: "gap",
      statement: "This property is a relation to a page type.",
    },
  ],
} as const satisfies TextProperty
