import type { Collection } from "akasha/alan/collections/collection.page-type.types.ts"
import type { ChapterText } from "akasha/alan/library/reading/book-sections/properties/chapter-text.file-property.ts"
import type { SectionOf } from "akasha/alan/library/reading/book-sections/properties/section-of.relation-property.types.ts"
import type { Slug } from "akasha/pages/properties/slug.text-property.ts"
import type { Title } from "akasha/pages/properties/title.text-property.ts"

export type BookSection = Collection & {
  slug: Slug
  title: Title
  chapterText: ChapterText
  sectionOf: SectionOf
}
