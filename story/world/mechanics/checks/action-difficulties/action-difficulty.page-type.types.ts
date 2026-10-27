import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Description } from "akasha/page/properties/description.text-property.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { OddsModifier } from "akasha/story/world/stories/played/difficulty-levels/properties/odds-modifier.number-property.types.ts"

export type ActionDifficulty = Page & {
  title: Title
  description: Description
  oddsModifier?: OddsModifier
}
