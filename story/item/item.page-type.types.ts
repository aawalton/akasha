import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { ItemCharacter } from "akasha/story/item/properties/item-character.relation-property.types.ts"

export type Item = Page & {
  title: Title
  character: ItemCharacter
}
