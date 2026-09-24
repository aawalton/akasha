import type { Id } from "akasha/page/properties/id.text-property.types.ts"
import type { BaseCardName } from "akasha/temper/catalog/pursuit/temper-tribute-patron/properties/base-card-name.text-property.types.ts"
import type { CardIndex } from "akasha/temper/catalog/pursuit/temper-tribute-patron/properties/card-index.number-property.types.ts"
import type { UpgradeCardName } from "akasha/temper/catalog/pursuit/temper-tribute-patron/properties/upgrade-card-name.text-property.types.ts"

export type Cards = "jsonl"

export type CardsRow = {
  id: Id
  cardIndex: CardIndex
  baseCardName: BaseCardName
  upgradeCardName: UpgradeCardName
}
