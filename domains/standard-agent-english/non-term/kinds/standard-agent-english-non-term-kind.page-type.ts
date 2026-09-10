import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const standardAgentEnglishNonTermKind = {
  id: "01a07c77-69a8-78a5-a3b4-fbf909b02c2e",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "standard-agent-english-non-term-kind",
  definition: "which sort one non-term is",
  pluralSlug: "standard-agent-english-non-term-kinds",
  extends: ["page-type/page"],
  properties: [
    { pageProperty: "standard-agent-english-property/definition", required: true, many: false },
  ],
  types: "ts",
} as const satisfies PageType
