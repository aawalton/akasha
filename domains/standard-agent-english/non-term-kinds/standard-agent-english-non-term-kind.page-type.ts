import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
import type { Definition } from "../../properties/definition.standard-agent-english-property.ts"

export type StandardAgentEnglishNonTermKind = Page & {
  definition: Definition
}

export const standardAgentEnglishNonTermKind = {
  id: "01a07c77-69a8-78a5-a3b4-fbf909b02c2e",
  pageTypeSlug: "page-type",
  slug: "standard-agent-english-non-term-kind",
  definition: "which sort one non-term is",
  pluralSlug: "standard-agent-english-non-term-kinds",
  extends: ["page-type/page"],
  properties: [
    { pagePropertySlug: "standard-agent-english-property/definition", required: true, many: false },
  ],
} as const satisfies PageType
