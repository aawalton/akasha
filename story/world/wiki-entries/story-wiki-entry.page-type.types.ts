import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { Prose } from "akasha/story/played/properties/prose.file-property.types.ts"
import type { World } from "akasha/story/played/properties/world.relation-property.types.ts"
import type { ChapterNumber } from "akasha/story/world/wiki-entries/properties/chapter-number.number-property.types.ts"
import type { WikiKind } from "akasha/story/world/wiki-entries/properties/wiki-kind.select-property.types.ts"

export type StoryWikiEntry = Page & {
  title: Title
  world?: World
  kind?: WikiKind
  chapterNumber?: ChapterNumber
  prose?: Prose
}
