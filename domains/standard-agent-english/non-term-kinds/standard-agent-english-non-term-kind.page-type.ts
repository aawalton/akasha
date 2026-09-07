import type { PageType } from "@akasha/pages/page-type"
import type { Domain } from "../../domain.page-type.ts"

export type StandardAgentEnglishNonTermKind = Domain

export const standardAgentEnglishNonTermKind = {
  id: "01a07c77-69a8-78a5-a3b4-fbf909b02c2e",
  pageTypeSlug: "page-type",
  slug: "standard-agent-english-non-term-kind",
  definition: "which sort one non-term is",
  pluralSlug: "standard-agent-english-non-term-kinds",
  partSlugs: [
    "standard-agent-english-non-term-kind/code",
    "standard-agent-english-non-term-kind/common",
    "standard-agent-english-non-term-kind/date",
    "standard-agent-english-non-term-kind/email",
    "standard-agent-english-non-term-kind/instant",
    "standard-agent-english-non-term-kind/number",
    "standard-agent-english-non-term-kind/page-address",
    "standard-agent-english-non-term-kind/phone-number",
    "standard-agent-english-non-term-kind/time",
  ],
  extendsSlug: ["page-type/domain"],
} as const satisfies PageType
