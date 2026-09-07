import type { PageType } from "@akasha/pages/page-type"
import type { Domain } from "../../domain.page-type.ts"

export type CommonLanguageTerm = Domain

export const commonLanguageTerm = {
  id: "01a07c6e-d2b5-7a30-95da-e46d29cd2e27",
  pageTypeSlug: "page-type",
  slug: "common-language-term",
  definition: "one word or phrase carrying its ordinary sense",
  pluralSlug: "common-language-terms",
  extendsSlug: ["page-type/domain"],
} as const satisfies PageType
