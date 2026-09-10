import type { Page } from "../../pages/page.page-type.ts"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { Prose } from "../stories-played/properties/prose.file-property.ts"
import type { World } from "../stories-played/properties/world.relation-property.ts"
import type { ChapterNumber } from "../wiki-entries/properties/chapter-number.number-property.ts"
import type { BuildLevel } from "./properties/build-level.number-property.ts"
import type { ClassName } from "./properties/class-name.text-property.ts"
import type { GameSystem } from "./properties/game-system.text-property.ts"

export type StoryBuild = Page & {
  title: Title
  world?: World
  chapterNumber?: ChapterNumber
  level?: BuildLevel
  className?: ClassName
  gameSystem?: GameSystem
  prose?: Prose
}
