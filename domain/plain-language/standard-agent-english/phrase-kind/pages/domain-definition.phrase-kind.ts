import type { PhraseKind } from "akasha/domain/plain-language/standard-agent-english/phrase-kind/phrase-kind.page-type.types.ts"

export const domainDefinition = {
  id: "01a0c595-e104-7533-adb2-f571b6fe7412",
  type: "page-type/phrase-kind",
  slug: "domain-definition",
  definition: "the sort of phrase a domain definition is written as",
} as const satisfies PhraseKind
