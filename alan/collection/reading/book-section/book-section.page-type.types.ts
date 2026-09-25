import type { Collection } from "akasha/alan/collection/collection.page-type.types.ts"
import type { ChapterText } from "akasha/alan/collection/reading/book-section/properties/chapter-text.file-property.types.ts"
import type { SectionOf } from "akasha/alan/collection/reading/book-section/properties/section-of.relation-property.types.ts"
import type { Slug } from "akasha/page/properties/slug.text-property.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type BookSection = Collection & {
  slug: Slug
  title: Title
  chapterText: ChapterText
  sectionOf: SectionOf
}
