import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type PersonSlug = string

export const personSlug = {
  id: "01a05035-2609-7a54-b753-59e288f9ac30",
  pageTypeSlug: "text-property",
  slug: "person-slug",
  definition: "the person whose seat this is",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "stopgap",
      statement: "This holds text because no person stands as a page.",
    },
    {
      invariantKind: "gap",
      statement: "This is a relation to a person.",
    },
  ],
} as const satisfies TextProperty
