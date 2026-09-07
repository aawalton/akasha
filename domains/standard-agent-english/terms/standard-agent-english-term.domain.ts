import type { Domain } from "../../domain.page-type.ts"

export const standardAgentEnglishTerm = {
  id: "01a07c58-708e-70fe-9434-12a511b1cd71",
  pageTypeSlug: "domain",
  slug: "standard-agent-english-term",
  definition: "one word or phrase akasha is allowed to write",
  partSlugs: [
    "page-type/standard-agent-english-term-kind",
    "page-type/common-language-term",
    "page-type/foreign-name-term",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A domain name is defined on the domain page.",
    },
    {
      invariantKind: "gap",
      statement: "A page address is defined in the page address system.",
    },
    {
      invariantKind: "departure",
      statement: "A common language term is defined on a page of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A foreign name is defined on a page of its own.",
    },
  ],
} as const satisfies Domain
