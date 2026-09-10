import type { Title } from "../../../../pages/properties/title.text-property.ts"
import type { CollectionExternal } from "../../../collections/externals/collection-external.page-type.types.ts"

export type Fandom = CollectionExternal & {
  title: Title
}
