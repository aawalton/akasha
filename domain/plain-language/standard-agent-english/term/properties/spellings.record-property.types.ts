import type { PartOfSpeech } from "akasha/domain/plain-language/standard-agent-english/part-of-speech/properties/part-of-speech.relation-property.types.ts"
import type { Spelling } from "akasha/domain/plain-language/standard-agent-english/term/properties/spelling.text-property.types.ts"
import type { SpellingScope } from "akasha/domain/plain-language/standard-agent-english/term/properties/spelling-scope.relation-property.types.ts"
import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"

export type Spellings = List<{
  partOfSpeech: PartOfSpeech
  spelling: Spelling
  scope?: SpellingScope
}>
