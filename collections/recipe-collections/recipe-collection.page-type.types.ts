import type { Title } from "../../pages/properties/title.text-property.ts"
import type { Collection } from "../collection.page-type.ts"

export type RecipeCollection = Collection & {
  title: Title
}
