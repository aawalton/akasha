import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { BuildLevel } from "akasha/story/world/builds/properties/build-level.number-property.types.ts"
import type { ClassName } from "akasha/story/world/builds/properties/class-name.text-property.types.ts"
import type { GameSystem } from "akasha/story/world/builds/properties/game-system.text-property.types.ts"
import type { Prose } from "akasha/story/world/stories/played/properties/prose.file-property.types.ts"
import type { World } from "akasha/story/world/stories/played/properties/world.relation-property.types.ts"
import type { ChapterNumber } from "akasha/story/world/wiki-entries/properties/chapter-number.number-property.types.ts"

export type StoryBuild = Page & {
  title: Title
  world?: World
  chapterNumber?: ChapterNumber
  level?: BuildLevel
  className?: ClassName
  gameSystem?: GameSystem
  prose?: Prose
}
