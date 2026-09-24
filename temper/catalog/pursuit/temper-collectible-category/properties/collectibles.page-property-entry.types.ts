import type { Id } from "akasha/page/properties/id.text-property.types.ts"
import type { CollectibleName } from "akasha/temper/catalog/pursuit/temper-collectible-category/properties/collectible-name.text-property.types.ts"
import type { EsoCollectibleId } from "akasha/temper/catalog/pursuit/thing/properties/eso-collectible-id.number-property.types.ts"

export type Collectibles = "jsonl"

export type CollectiblesRow = {
  id: Id
  esoCollectibleId: EsoCollectibleId
  collectibleName: CollectibleName
}
