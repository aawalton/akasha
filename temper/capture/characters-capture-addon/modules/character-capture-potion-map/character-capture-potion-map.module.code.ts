import "akasha/temper/eso/type/eso-lua-sandbox/eso-lua-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/lua-language-extensions/lua-language-extensions.type-declaration.d.ts"
import { parseLuaCapture } from "akasha/temper/addon/shared/narrow/modules/parse-lua-capture/parse-lua-capture.module.code.ts"
import { noPotion } from "akasha/temper/catalog/gear/temper-potion/pages/no-potion.temper-potion.ts"
import { temperPotion } from "akasha/temper/catalog/gear/temper-potion/temper-potion.page-type.ts"
import type { TemperPotion } from "akasha/temper/catalog/gear/temper-potion/temper-potion.page-type.types.ts"
import { temperPotionCrafted } from "akasha/temper/catalog/gear/temper-potion-crafted/temper-potion-crafted.page-type.ts"
import type { TemperPotionCrafted } from "akasha/temper/catalog/gear/temper-potion-crafted/temper-potion-crafted.page-type.types.ts"
import { temperPotionCrown } from "akasha/temper/catalog/gear/temper-potion-crown/temper-potion-crown.page-type.ts"
import type { TemperPotionCrown } from "akasha/temper/catalog/gear/temper-potion-crown/temper-potion-crown.page-type.types.ts"
import { temperPotionDropped } from "akasha/temper/catalog/gear/temper-potion-dropped/temper-potion-dropped.page-type.ts"
import type { TemperPotionDropped } from "akasha/temper/catalog/gear/temper-potion-dropped/temper-potion-dropped.page-type.types.ts"
import type { PotionRestores } from "akasha/temper/items/rules/core/modules/potion-restore-resolve/potion-restore-resolve.module.code.ts"

type Places = { [gameNumber: number]: number | undefined }

let itemIdPlaces: Places | undefined

let encodedTraitsPlaces: Places | undefined

function itemIdPlacesOf(this: void): Places {
  const found: Places = {}
  for (const one of $pagesOfType<Pick<TemperPotionCrown, "itemId" | "hashPlace">>(
    temperPotionCrown
  )) {
    found[one.itemId] = one.hashPlace
  }
  for (const one of $pagesOfType<Pick<TemperPotionDropped, "itemId" | "hashPlace">>(
    temperPotionDropped
  )) {
    found[one.itemId] = one.hashPlace
  }
  return found
}

type Restoring = Pick<TemperPotion, "itemId" | "restores">

export function potionRestoresCompiledIn(this: void): readonly PotionRestores[] {
  const found: PotionRestores[] = []
  const kinds = [
    $pagesOfType<Restoring>(temperPotion),
    $pagesOfType<Restoring>(temperPotionCrown),
    $pagesOfType<Restoring>(temperPotionDropped),
  ]
  for (const pages of kinds) {
    for (const one of pages) {
      if (one.itemId !== undefined && one.restores !== undefined) {
        found.push({ itemId: one.itemId, restores: one.restores })
      }
    }
  }
  return found
}

function encodedTraitsPlacesOf(this: void): Places {
  const found: Places = {}
  for (const one of $pagesOfType<Pick<TemperPotionCrafted, "encodedTraits" | "hashPlace">>(
    temperPotionCrafted
  )) {
    found[one.encodedTraits] = one.hashPlace
  }
  return found
}
export function parsePotionData(itemLink: string): number {
  const [potionCapture] = string.match(itemLink, ":(%d+)|h")
  const potionData = parseLuaCapture(potionCapture)
  if (potionData !== undefined) {
    return tonumber(potionData) ?? 0
  }
  return 0
}
export function getPotionIndex(itemId: number, encodedTraits: number): number {
  if (encodedTraits !== 0) {
    encodedTraitsPlaces ??= encodedTraitsPlacesOf()
    return encodedTraitsPlaces[encodedTraits] ?? noPotion.hashPlace
  }
  itemIdPlaces ??= itemIdPlacesOf()
  return itemIdPlaces[itemId] ?? noPotion.hashPlace
}
