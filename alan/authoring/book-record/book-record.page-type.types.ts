import type { KeptBy } from "akasha/alan/authoring/book-record/properties/kept-by.text-property.types.ts"
import type { RecordBookSlug } from "akasha/alan/authoring/book-record/properties/record-book-slug.text-property.types.ts"
import type { RecordBrief } from "akasha/alan/authoring/book-record/properties/record-brief.text-property.types.ts"
import type { Writing } from "akasha/alan/authoring/book-record/properties/writing.file-property.types.ts"
import type { Definition } from "akasha/domain/properties/definition.standard-agent-english-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type BookRecord = Page & {
  title: Title
  definition: Definition
  book: RecordBookSlug
  brief?: RecordBrief
  keptBy?: KeptBy
  writing: Writing
}
