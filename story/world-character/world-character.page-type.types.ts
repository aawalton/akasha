import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { World } from "akasha/story/played/properties/world.relation-property.types.ts"
import type { AliasOf } from "akasha/story/world-character/properties/alias-of.relation-property.types.ts"
import type { CharacterClaims } from "akasha/story/world-character/properties/character-claims.page-property-entry.types.ts"
import type { EventCount } from "akasha/story/world-character/properties/event-count.number-property.types.ts"
import type { FirstChapter } from "akasha/story/world-character/properties/first-chapter.number-property.types.ts"
import type { LastChapter } from "akasha/story/world-character/properties/last-chapter.number-property.types.ts"
import type { MaxLevel } from "akasha/story/world-character/properties/max-level.number-property.types.ts"
import type { MergedInto } from "akasha/story/world-character/properties/merged-into.relation-property.types.ts"

export type WorldCharacter = Page & {
  title: Title
  world?: World
  maxLevel?: MaxLevel
  eventCount?: EventCount
  firstChapter?: FirstChapter
  lastChapter?: LastChapter
  characterClaims?: CharacterClaims
  aliasOf?: AliasOf
  mergedInto?: MergedInto
}
