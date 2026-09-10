import type { Collection } from "../../../../collections/collection.page-type.types.ts"
import type { Slug } from "../../../../pages/properties/slug.text-property.ts"
import type { Title } from "../../../../pages/properties/title.text-property.ts"
import type { ChapterText } from "./properties/chapter-text.file-property.ts"
import type { SectionOf } from "./properties/section-of.relation-property.ts"

export type BookSection = Collection & {
  slug: Slug
  title: Title
  chapterText: ChapterText
  sectionOf: SectionOf
}
