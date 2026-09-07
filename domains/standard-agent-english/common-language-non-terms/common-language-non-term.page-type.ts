import type { PageType } from "@akasha/pages/page-type"
import type { Domain } from "../../domain.page-type.ts"

export type CommonLanguageNonTerm = Domain

export const commonLanguageNonTerm = {
  id: "01a07cf4-41e4-7a91-a71d-859f360af82a",
  pageTypeSlug: "page-type",
  slug: "common-language-non-term",
  definition: "one common word or phrase akasha does not write",
  pluralSlug: "common-language-non-terms",
  extendsSlug: ["page-type/domain"],
} as const satisfies PageType
