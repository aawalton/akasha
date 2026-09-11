import type { KeptBy } from "akasha/alan/authoring/book-records/properties/kept-by.text-property.ts"
import type { RecordBookSlug } from "akasha/alan/authoring/book-records/properties/record-book-slug.text-property.ts"
import type { RecordBrief } from "akasha/alan/authoring/book-records/properties/record-brief.text-property.ts"
import type { Writing } from "akasha/alan/authoring/book-records/properties/writing.file-property.ts"
import type { Definition } from "akasha/domains/properties/definition.standard-agent-english-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.ts"

export type BookRecord = Page & {
  title: Title
  definition: Definition
  bookSlug: RecordBookSlug
  brief?: RecordBrief
  keptBy?: KeptBy
  writing: Writing
}
