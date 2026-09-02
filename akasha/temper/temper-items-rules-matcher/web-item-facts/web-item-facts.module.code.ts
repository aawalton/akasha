import { locationConditionFromKeyAndBag } from "@akasha/temper-items-core/location-condition"
import type { ClassifiedInventoryItem } from "@akasha/temper-items-rules-core/inventory-rule-matcher-types"
import type { RuleMatcherContext } from "@akasha/temper-items-rules-core/rule-matcher-context-types"
import type { ItemKey } from "@akasha/temper-items-rules-core/use-destination-types"
import {
  buildItemFactsFromInventoryItem,
  resolveStaticItemKey,
} from "@akasha/temper-items-rules-eval/build-item-facts-from-inventory-item"
import type { ItemFacts } from "@akasha/temper-items-rules-eval/item-facts"

export function webItemFactsFromClassified(
  ci: ClassifiedInventoryItem,
  context?: RuleMatcherContext
): ItemFacts {
  return buildItemFactsFromInventoryItem({
    item: ci.item,
    nodeIds: ci.nodeIds,
    location: locationConditionFromKeyAndBag(ci.locationKey, ci.bagId),
    itemKey: resolveItemKey(ci.item, context),
  })
}

function resolveItemKey(
  item: ClassifiedInventoryItem["item"],
  context: RuleMatcherContext | undefined
): ItemKey | undefined {
  const staticKey = resolveStaticItemKey(item)
  if (staticKey !== undefined) return staticKey
  if (context !== undefined) {
    const wanters = context.wantedConsumables.get(item.itemId)
    if (wanters !== undefined && wanters.length > 0) {
      return { kind: "consumable", itemId: item.itemId }
    }
  }
  return undefined
}
