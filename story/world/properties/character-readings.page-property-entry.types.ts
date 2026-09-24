import type { Id } from "akasha/page/properties/id.text-property.types.ts"
import type { ReadingCharacter } from "akasha/story/world/properties/reading-character.relation-property.types.ts"
import type { ReadingKind } from "akasha/story/world/properties/reading-kind.select-property.types.ts"
import type { ReadingName } from "akasha/story/world/properties/reading-name.text-property.types.ts"
import type { ReadingSlug } from "akasha/story/world/properties/reading-slug.text-property.types.ts"

export type CharacterReadings = "jsonl"

export type CharacterReadingsRow = {
  id: Id
  readingSlug: ReadingSlug
  readingName: ReadingName
  readingKind: ReadingKind
  character?: ReadingCharacter
}
