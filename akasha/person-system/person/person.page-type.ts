import type { Domain } from "../../domain-system/domain/domain.page-type.ts"
import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"

export type Person = Domain

export const person = {
  id: "01a053e0-6cf7-7062-90af-db1def200572",
  pageTypeSlug: "page-type",
  slug: "person",
  definition: "a human this system reaches",
  pluralSlug: "people",
  extendsSlug: "page-type/domain",
} as const satisfies PageType
