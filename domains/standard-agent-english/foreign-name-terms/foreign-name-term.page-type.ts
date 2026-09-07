import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
import type { Definition } from "../../properties/definition.standard-agent-english-property.ts"

export type ForeignNameTerm = Page & {
  definition: Definition
}

export const foreignNameTerm = {
  id: "01a07c6e-df85-7cad-a74c-d84a45b5f15c",
  pageTypeSlug: "page-type",
  slug: "foreign-name-term",
  definition: "one name whose sense is set outside akasha",
  pluralSlug: "foreign-name-terms",
  extendsSlug: ["page-type/page"],
  properties: [
    { pagePropertySlug: "standard-agent-english-property/definition", required: true, many: false },
  ],
} as const satisfies PageType
