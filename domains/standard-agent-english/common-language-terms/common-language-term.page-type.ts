import type { PageType } from "@akasha/pages/page-type"
import type { AllowedTerm } from "../allowed-terms/allowed-term.page-type.ts"

export type CommonLanguageTerm = AllowedTerm

export const commonLanguageTerm = {
  id: "01a07c6e-d2b5-7a30-95da-e46d29cd2e27",
  pageTypeSlug: "page-type",
  slug: "common-language-term",
  definition: "one word or phrase with its ordinary sense",
  pluralSlug: "common-language-terms",
  extends: ["page-type/allowed-term"],
} as const satisfies PageType
