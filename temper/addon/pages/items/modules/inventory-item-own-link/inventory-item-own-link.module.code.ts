import { ITEM_LINK_TEMPLATE } from "akasha/temper/addon/pages/catalog/modules/datamining-constants/datamining-constants.module.code.ts"
import type { ItemData } from "akasha/temper/addon/pages/items/modules/inventory-saved-variables-types/inventory-saved-variables-types.module.code.ts"
import type { SetBonusEntry } from "akasha/temper/items/core/modules/item-tooltip-types/item-tooltip-types.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"

function bareLinkOf(itemId: number): string {
  return string.format(ITEM_LINK_TEMPLATE, itemId)
}

function setBonusesOf(itemLink: string): SetBonusEntry[] {
  const [hasSet, , numBonuses] = GetItemLinkSetInfo(itemLink, false)
  const bonuses: SetBonusEntry[] = []
  if (!hasSet) return bonuses
  for (let index = 1; index <= numBonuses; index++) {
    const [numRequired, description, isPerfected] = GetItemLinkSetBonusInfo(itemLink, false, index)
    if (description !== "") bonuses.push({ numRequired, description, isPerfected })
  }
  return bonuses
}

function sameBonusText(one: readonly SetBonusEntry[], other: readonly SetBonusEntry[]): boolean {
  if (one.length !== other.length) return false
  for (let index = 0; index < one.length; index++) {
    if (one[index]?.description !== other[index]?.description) return false
  }
  return true
}

export function recordOwnLinkValues(result: ItemData, itemLink: string): undefined {
  const bareLink = bareLinkOf(result.itemId)

  const weaponPower = GetItemLinkWeaponPower(itemLink)
  if (weaponPower > 0) result.weaponPower = weaponPower

  const armorRating = GetItemLinkArmorRating(itemLink, false)
  if (armorRating > 0) result.armorRating = armorRating

  const [, traitDescription] = GetItemLinkTraitInfo(itemLink)
  const [, bareTraitDescription] = GetItemLinkTraitInfo(bareLink)
  if (traitDescription !== "" && traitDescription !== bareTraitDescription) {
    result.traitDescription = traitDescription
  }

  const [hasAbility, abilityHeader, abilityDescription, abilityCooldown] =
    GetItemLinkOnUseAbilityInfo(itemLink)
  const [, , bareAbilityDescription] = GetItemLinkOnUseAbilityInfo(bareLink)
  if (hasAbility && abilityDescription !== "" && abilityDescription !== bareAbilityDescription) {
    result.abilityHeader = abilityHeader
    result.abilityDescription = abilityDescription
    result.abilityCooldown = abilityCooldown
  }

  const setBonuses = setBonusesOf(itemLink)
  if (setBonuses.length > 0 && !sameBonusText(setBonuses, setBonusesOf(bareLink))) {
    result.setBonuses = setBonuses
  }
  return undefined
}
