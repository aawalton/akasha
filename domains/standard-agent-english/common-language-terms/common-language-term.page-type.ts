import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
import type { Definition } from "../../properties/definition.standard-agent-english-property.ts"

export type CommonLanguageTerm = Page & {
  definition: Definition
}

export const commonLanguageTerm = {
  id: "01a07c6e-d2b5-7a30-95da-e46d29cd2e27",
  pageTypeSlug: "page-type",
  slug: "common-language-term",
  definition: "one word or phrase carrying its ordinary sense",
  pluralSlug: "common-language-terms",
  extendsSlug: ["page-type/page"],
  properties: [
    { pagePropertySlug: "standard-agent-english-property/definition", required: true, many: false },
  ],
} as const satisfies PageType
