import type { Definition } from "../../../domains/properties/definition.standard-agent-english-property.ts"
import type { Page } from "../../../pages/page.page-type.ts"
import type { Title } from "../../../pages/properties/title.text-property.ts"
import type { KeptBy } from "./properties/kept-by.text-property.ts"
import type { RecordBookSlug } from "./properties/record-book-slug.text-property.ts"
import type { RecordBrief } from "./properties/record-brief.text-property.ts"
import type { Writing } from "./properties/writing.file-property.ts"

export type BookRecord = Page & {
  title: Title
  definition: Definition
  bookSlug: RecordBookSlug
  brief?: RecordBrief
  keptBy?: KeptBy
  writing: Writing
}
