import type { Construction } from "akasha/domain/standard-agent-english/construction/construction.page-type.types.ts"

export const domainDefinitionAsANounPhrase = {
  id: "01a0c5eb-3c5d-7f11-aee5-f7b60653cd40",
  type: "page-type/construction",
  slug: "domain-definition-as-a-noun-phrase",
  definition: "a domain definition written from a noun phrase and nothing else",
  phraseKind: "phrase-kind/domain-definition",
  writtenFrom: ["phrase-kind/noun-phrase"],
  admits: ["a machine in a cluster", "markdown"],
  refuses: ["in a cluster", "a machine in a cluster of servers in a rock"],
} as const satisfies Construction
