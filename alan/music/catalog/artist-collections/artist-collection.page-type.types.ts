import type { Title } from "../../../../pages/properties/title.text-property.ts"
import type { Collection } from "../../../collections/collection.page-type.types.ts"

export type ArtistCollection = Collection & {
  title: Title
}
