import type { Page } from "../../pages/page.page-type.types.ts"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { World } from "../stories-played/properties/world.relation-property.ts"
import type { EventCount } from "./properties/event-count.number-property.types.ts"
import type { FirstChapter } from "./properties/first-chapter.number-property.types.ts"
import type { LastChapter } from "./properties/last-chapter.number-property.types.ts"
import type { MaxLevel } from "./properties/max-level.number-property.types.ts"

export type WorldCharacter = Page & {
  title: Title
  world?: World
  maxLevel?: MaxLevel
  eventCount?: EventCount
  firstChapter?: FirstChapter
  lastChapter?: LastChapter
}
