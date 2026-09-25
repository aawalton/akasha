import type { PhraseKind } from "akasha/domain/plain-language/standard-agent-english/construction/properties/phrase-kind.relation-property.types.ts"
import type { PartOfSpeech } from "akasha/domain/plain-language/standard-agent-english/part-of-speech/properties/part-of-speech.relation-property.types.ts"
import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"

export type WrittenFrom = List<PartOfSpeech | PhraseKind>
