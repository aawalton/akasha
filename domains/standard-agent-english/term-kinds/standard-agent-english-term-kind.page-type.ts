import type { PageType } from "@akasha/pages/page-type"
import type { Domain } from "../../domain.page-type.ts"

export type StandardAgentEnglishTermKind = Domain

export const standardAgentEnglishTermKind = {
  id: "01a07c58-36d3-7697-9f2b-6133db073a38",
  pageTypeSlug: "page-type",
  slug: "standard-agent-english-term-kind",
  definition: "which sort one term is",
  pluralSlug: "standard-agent-english-term-kinds",
  partSlugs: [
    "standard-agent-english-term-kind/common-language",
    "standard-agent-english-term-kind/domain-name",
    "standard-agent-english-term-kind/page-address",
  ],
  extendsSlug: ["page-type/domain"],
} as const satisfies PageType
