import type { Page } from "../../pages/page.page-type.types.ts"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { Prose } from "../stories-played/properties/prose.file-property.ts"
import type { World } from "../stories-played/properties/world.relation-property.ts"
import type { ChapterNumber } from "./properties/chapter-number.number-property.ts"
import type { WikiKind } from "./properties/wiki-kind.select-property.ts"

export type StoryWikiEntry = Page & {
  title: Title
  world?: World
  kind?: WikiKind
  chapterNumber?: ChapterNumber
  prose?: Prose
}
