import type { Cover } from "akasha/page/properties/cover.relation-property.types.ts"
import type { Description } from "akasha/page/properties/description.text-property.types.ts"
import type { Entries } from "akasha/page/properties/entries.file-property.types.ts"
import type { Grade } from "akasha/page/properties/grade.grade-property.types.ts"
import type { Id } from "akasha/page/properties/id.text-property.types.ts"
import type { PagePageType } from "akasha/page/properties/page-page-type.relation-property.types.ts"
import type { ReferencedBy } from "akasha/page/properties/referenced-by.file-property.types.ts"
import type { Slug } from "akasha/page/properties/slug.text-property.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type Page = {
  id: Id
  type?: PagePageType
  slug: Slug
  title?: Title
  description?: Description
  cover?: Cover
  entries?: Entries
  referencedBy?: ReferencedBy
  grade?: Grade
}
