import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type Serves = string

export const personAccessServes = {
  id: "01a05430-c0ef-7fbe-8836-045d9e351ad7",
  pageTypeSlug: "text-property",
  slug: "person-access-serves",
  propertySlug: "person-access-serves",
  definition: "the shared page type the target stands in for",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A target serves a page type only where it is a person's own copy of one.",
    },
    {
      invariantKind: "stopgap",
      statement: "This holds text because no page type served by a target stands as a page.",
    },
    {
      invariantKind: "gap",
      statement: "This is a relation to a page type.",
    },
  ],
} as const satisfies TextProperty
