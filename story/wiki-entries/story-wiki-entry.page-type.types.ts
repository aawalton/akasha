import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.ts"
import type { Prose } from "akasha/story/stories-played/properties/prose.file-property.ts"
import type { World } from "akasha/story/stories-played/properties/world.relation-property.types.ts"
import type { ChapterNumber } from "akasha/story/wiki-entries/properties/chapter-number.number-property.types.ts"
import type { WikiKind } from "akasha/story/wiki-entries/properties/wiki-kind.select-property.types.ts"

export type StoryWikiEntry = Page & {
  title: Title
  world?: World
  kind?: WikiKind
  chapterNumber?: ChapterNumber
  prose?: Prose
}
