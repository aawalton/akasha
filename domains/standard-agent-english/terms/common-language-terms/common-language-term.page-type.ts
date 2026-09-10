import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const commonLanguageTerm = {
  id: "01a07c6e-d2b5-7a30-95da-e46d29cd2e27",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "common-language-term",
  definition: "one word or phrase with its ordinary sense",
  pluralSlug: "common-language-terms",
  extends: ["page-type/allowed-term"],
  types: "ts",
} as const satisfies PageType
