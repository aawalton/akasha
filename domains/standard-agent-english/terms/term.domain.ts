import type { Domain } from "../../domain.page-type.types.ts"

export const term = {
  id: "01a07c58-708e-70fe-9434-12a511b1cd71",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "term",
  definition: "one word or phrase, and whether akasha writes it",
  parts: [
    "page-type/common-language-term",
    "page-type/foreign-name-term",
    "page-type/term",
    "page-type/allowed-term",
    "page-type/banned-term",
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
    {
      invariantKind: "departure",
      statement: "A word and that word's variants are one term.",
    },
    {
      invariantKind: "departure",
      statement: "Two spellings that differ only by grammar are variants.",
    },
    {
      invariantKind: "departure",
      statement: "A term is written under its plainest spelling.",
    },
  ],
} as const satisfies Domain
