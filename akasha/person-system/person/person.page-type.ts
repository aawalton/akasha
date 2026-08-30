import type { Domain } from "../../domain-system/domain/domain.page-type.ts"
import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"
import type { AnsweredBy } from "./properties/answered-by.relation-property.ts"

export type Person = Domain & {
  answeredBy: AnsweredBy
}

export const person = {
  id: "01a053e0-6cf7-7062-90af-db1def200572",
  pageTypeSlug: "page-type",
  slug: "person",
  definition: "a human this system reaches",
  pluralSlug: "people",
  extendsSlug: "page-type/domain",
  partSlugs: ["relation-property/answered-by"],
  properties: [{ pagePropertySlug: "answered-by", required: true, many: false }],
} as const satisfies PageType
