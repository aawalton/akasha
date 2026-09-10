import type { AuthorityKind } from "../authority-kind.page-type.types.ts"

export const pageSchema = {
  id: "01a0542d-4b9f-7665-84e4-7b82e5460719",
  pageTypeSlug: "authority-kind",
  type: "authority-kind",
  slug: "page-schema",
  definition: "the shape a page type has its pages to",
} as const satisfies AuthorityKind
