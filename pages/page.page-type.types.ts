import type { Cover } from "./properties/cover.text-property.ts"
import type { Description } from "./properties/description.text-property.ts"
import type { Id } from "./properties/id.text-property.ts"
import type { PagePageType } from "./properties/page-page-type.relation-property.ts"
import type { PageTypeSlug } from "./properties/page-type-slug.relation-property.ts"
import type { Slug } from "./properties/slug.text-property.ts"
import type { Title } from "./properties/title.text-property.ts"

export type Page = {
  id: Id
  pageTypeSlug?: PageTypeSlug
  type?: PagePageType
  slug: Slug
  title?: Title
  description?: Description
  cover?: Cover
}
