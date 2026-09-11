import type { Cover } from "akasha/pages/properties/cover.text-property.ts"
import type { Description } from "akasha/pages/properties/description.text-property.ts"
import type { Id } from "akasha/pages/properties/id.text-property.ts"
import type { PagePageType } from "akasha/pages/properties/page-page-type.relation-property.types.ts"
import type { PageTypeSlug } from "akasha/pages/properties/page-type-slug.relation-property.types.ts"
import type { Slug } from "akasha/pages/properties/slug.text-property.ts"
import type { Title } from "akasha/pages/properties/title.text-property.ts"

export type Page = {
  id: Id
  pageTypeSlug?: PageTypeSlug
  type?: PagePageType
  slug: Slug
  title?: Title
  description?: Description
  cover?: Cover
}
