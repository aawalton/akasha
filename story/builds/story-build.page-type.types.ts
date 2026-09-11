import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.types.ts"
import type { BuildLevel } from "akasha/story/builds/properties/build-level.number-property.types.ts"
import type { ClassName } from "akasha/story/builds/properties/class-name.text-property.types.ts"
import type { GameSystem } from "akasha/story/builds/properties/game-system.text-property.types.ts"
import type { Prose } from "akasha/story/stories-played/properties/prose.file-property.types.ts"
import type { World } from "akasha/story/stories-played/properties/world.relation-property.types.ts"
import type { ChapterNumber } from "akasha/story/wiki-entries/properties/chapter-number.number-property.types.ts"

export type StoryBuild = Page & {
  title: Title
  world?: World
  chapterNumber?: ChapterNumber
  level?: BuildLevel
  className?: ClassName
  gameSystem?: GameSystem
  prose?: Prose
}
