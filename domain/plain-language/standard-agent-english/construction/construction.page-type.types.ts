import type { Domain } from "akasha/domain/domain.page-type.types.ts"
import type { Admits } from "akasha/domain/plain-language/standard-agent-english/construction/properties/admits.text-property.types.ts"
import type { PhraseKind } from "akasha/domain/plain-language/standard-agent-english/construction/properties/phrase-kind.relation-property.types.ts"
import type { Refuses } from "akasha/domain/plain-language/standard-agent-english/construction/properties/refuses.text-property.types.ts"
import type { WrittenFrom } from "akasha/domain/plain-language/standard-agent-english/construction/properties/written-from.one-of-property.types.ts"

export type Construction = Domain & {
  phraseKind: PhraseKind
  writtenFrom: WrittenFrom
  admits: Admits
  refuses?: Refuses
}
