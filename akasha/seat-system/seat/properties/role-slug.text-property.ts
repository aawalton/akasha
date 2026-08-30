import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type RoleSlug = string

export const roleSlug = {
  id: "01a05035-2609-769e-8bce-5f13a7ed3df4",
  pageTypeSlug: "text-property",
  slug: "role-slug",
  definition: "what a seat is answerable for where it sits",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "stopgap",
      statement: "This holds text because the roles a seat can take do not stand as pages.",
    },
    {
      invariantKind: "gap",
      statement: "This is a relation to a role.",
    },
  ],
} as const satisfies TextProperty
