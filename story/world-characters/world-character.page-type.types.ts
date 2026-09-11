import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.types.ts"
import type { World } from "akasha/story/stories-played/properties/world.relation-property.types.ts"
import type { EventCount } from "akasha/story/world-characters/properties/event-count.number-property.types.ts"
import type { FirstChapter } from "akasha/story/world-characters/properties/first-chapter.number-property.types.ts"
import type { LastChapter } from "akasha/story/world-characters/properties/last-chapter.number-property.types.ts"
import type { MaxLevel } from "akasha/story/world-characters/properties/max-level.number-property.types.ts"

export type WorldCharacter = Page & {
  title: Title
  world?: World
  maxLevel?: MaxLevel
  eventCount?: EventCount
  firstChapter?: FirstChapter
  lastChapter?: LastChapter
}
