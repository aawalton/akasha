import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { Mechanic } from "akasha/story/mechanic/mechanic.page-type.types.ts"

export type Element = Mechanic & {
  title: Title
}
