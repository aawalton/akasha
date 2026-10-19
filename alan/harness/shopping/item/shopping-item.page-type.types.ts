import type { ShoppingItemBoughtAt } from "akasha/alan/harness/shopping/item/properties/shopping-item-bought-at.instant-property.types.ts"
import type { ShoppingItemStore } from "akasha/alan/harness/shopping/item/properties/shopping-item-store.relation-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type ShoppingItem = Page & {
  title: Title
  store?: ShoppingItemStore
  boughtAt?: ShoppingItemBoughtAt
}
