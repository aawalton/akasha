import type { Collection } from "../../../../collections/collection.page-type.ts"
import type { Title } from "../../../../pages/properties/title.text-property.ts"

export type ArtistCollection = Collection & {
  title: Title
}
