import type { PhraseKind } from "akasha/domain/standard-agent-english/phrase-kind/phrase-kind.page-type.types.ts"

export const domainDefinitionStart = {
  id: "01a0c595-e104-7533-adb2-f571b6fe7412",
  type: "page-type/phrase-kind",
  slug: "domain-definition-start",
  definition: "the sort of phrase a domain definition is written as",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A start symbol is a phrase kind no other construction is written from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A phrase kind with no construction admits nothing, which is where this one starts.",
    },
  ],
} as const satisfies PhraseKind
