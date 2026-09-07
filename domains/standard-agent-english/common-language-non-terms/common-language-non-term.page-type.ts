import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
import type { Definition } from "../../properties/definition.standard-agent-english-property.ts"

export type CommonLanguageNonTerm = Page & {
  definition: Definition
}

export const commonLanguageNonTerm = {
  id: "01a07cf4-41e4-7a91-a71d-859f360af82a",
  pageTypeSlug: "page-type",
  slug: "common-language-non-term",
  definition: "one common word or phrase akasha does not write",
  pluralSlug: "common-language-non-terms",
  extendsSlug: ["page-type/page"],
  properties: [
    { pagePropertySlug: "standard-agent-english-property/definition", required: true, many: false },
  ],
} as const satisfies PageType
