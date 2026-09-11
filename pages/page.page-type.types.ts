import type { Cover } from "akasha/pages/properties/cover.text-property.types.ts"
import type { Description } from "akasha/pages/properties/description.text-property.types.ts"
import type { Id } from "akasha/pages/properties/id.text-property.types.ts"
import type { PagePageType } from "akasha/pages/properties/page-page-type.relation-property.types.ts"
import type { PageTypeSlug } from "akasha/pages/properties/page-type-slug.relation-property.types.ts"
import type { Slug } from "akasha/pages/properties/slug.text-property.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.types.ts"

export type Page = {
  id: Id
  pageTypeSlug?: PageTypeSlug
  type?: PagePageType
  slug: Slug
  title?: Title
  description?: Description
  cover?: Cover
}
