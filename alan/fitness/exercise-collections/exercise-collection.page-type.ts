import type { PageType } from "@akasha/pages-system/page-type"
import type { Collection } from "../../../collection-system/collections/collection.page-type.ts"
import type { Title } from "../../../pages/properties/title.text-property.ts"

export type ExerciseCollection = Collection & {
  title: Title
}

export const exerciseCollection = {
  id: "01a0685c-1bac-79da-a133-377a4db1c229",
  pageTypeSlug: "page-type",
  slug: "exercise-collection",
  definition: "a shelf of exercises Alan keeps together",
  pluralSlug: "exercise-collections",
  extendsSlug: ["page-type/collection"],
  properties: [{ pagePropertySlug: "title", required: true, many: false }],
} as const satisfies PageType
