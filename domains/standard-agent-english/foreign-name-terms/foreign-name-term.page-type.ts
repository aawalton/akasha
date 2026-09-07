import type { PageType } from "@akasha/pages/page-type"
import type { Domain } from "../../domain.page-type.ts"

export type ForeignNameTerm = Domain

export const foreignNameTerm = {
  id: "01a07c6e-df85-7cad-a74c-d84a45b5f15c",
  pageTypeSlug: "page-type",
  slug: "foreign-name-term",
  definition: "one name whose sense is set outside akasha",
  pluralSlug: "foreign-name-terms",
  extendsSlug: ["page-type/domain"],
} as const satisfies PageType
