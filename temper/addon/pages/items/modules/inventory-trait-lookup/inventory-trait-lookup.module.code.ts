import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import { temperCompanionTrait } from "akasha/temper/catalog/companion/trait/temper-companion-trait.page-type.ts"
import type { TemperCompanionTrait } from "akasha/temper/catalog/companion/trait/temper-companion-trait.page-type.types.ts"
import { temperArmorTrait } from "akasha/temper/catalog/gear/temper-armor-trait/temper-armor-trait.page-type.ts"
import type { TemperArmorTrait } from "akasha/temper/catalog/gear/temper-armor-trait/temper-armor-trait.page-type.types.ts"
import { temperEquipType } from "akasha/temper/catalog/gear/temper-equip-type/temper-equip-type.page-type.ts"
import type { TemperEquipType } from "akasha/temper/catalog/gear/temper-equip-type/temper-equip-type.page-type.types.ts"
import { temperEsoTraitMap } from "akasha/temper/catalog/gear/temper-eso-trait-map/temper-eso-trait-map.page-type.ts"
import type { TemperEsoTraitMap } from "akasha/temper/catalog/gear/temper-eso-trait-map/temper-eso-trait-map.page-type.types.ts"
import { temperJewelryTrait } from "akasha/temper/catalog/gear/temper-jewelry-trait/temper-jewelry-trait.page-type.ts"
import type { TemperJewelryTrait } from "akasha/temper/catalog/gear/temper-jewelry-trait/temper-jewelry-trait.page-type.types.ts"
import { temperJewelryType } from "akasha/temper/catalog/gear/temper-jewelry-type/temper-jewelry-type.page-type.ts"
import type { TemperJewelryType } from "akasha/temper/catalog/gear/temper-jewelry-type/temper-jewelry-type.page-type.types.ts"
import { temperWeaponTrait } from "akasha/temper/catalog/gear/temper-weapon-trait/temper-weapon-trait.page-type.ts"
import type { TemperWeaponTrait } from "akasha/temper/catalog/gear/temper-weapon-trait/temper-weapon-trait.page-type.types.ts"
import {
  esoTraitToTemperId,
  type GearFamily,
  isCompanionTraitNumber,
} from "akasha/temper/items/core/modules/eso-trait-reverse-map/eso-trait-reverse-map.module.code.ts"

type ByKey = { [key: string]: string | undefined }

type Numbers = { [traitId: string]: number[] | undefined }

type TraitOption = { readonly value: string; readonly label: string }

type TraitTables = {
  readonly player: ByKey
  readonly companion: ByKey
  readonly numbers: Numbers
  readonly jewelry: { [equipType: string]: boolean | undefined }
}

let held: TraitTables | undefined

function slugIn(this: void, address: string): string {
  const parts = address.split("/")
  return parts[parts.length - 1] ?? address
}

function noted(this: void, numbers: Numbers, traitId: string, esoNumber: number): undefined {
  const list = numbers[traitId] ?? []
  if (!list.includes(esoNumber)) list.push(esoNumber)
  numbers[traitId] = list
  return undefined
}

function companionNumbers(
  this: void,
  one: Pick<
    TemperCompanionTrait,
    "key" | "esoWeaponTraitType" | "esoArmorTraitType" | "esoJewelryTraitType"
  >
): readonly (readonly [GearFamily, number | undefined])[] {
  return [
    ["weapon", one.esoWeaponTraitType],
    ["armor", one.esoArmorTraitType],
    ["jewelry", one.esoJewelryTraitType],
  ]
}

function tablesOf(this: void): TraitTables {
  const player: ByKey = {}
  const companion: ByKey = {}
  const numbers: Numbers = {}
  for (const one of $pagesOfType<
    Pick<TemperEsoTraitMap, "traitFamily" | "traitId" | "esoTraitNum">
  >(temperEsoTraitMap)) {
    if (one.esoTraitNum === 0) continue
    const traitId = slugIn(one.traitId)
    player[`${one.traitFamily}/${one.esoTraitNum}`] = traitId
    noted(numbers, traitId, one.esoTraitNum)
  }
  for (const one of $pagesOfType<
    Pick<
      TemperCompanionTrait,
      "key" | "esoWeaponTraitType" | "esoArmorTraitType" | "esoJewelryTraitType"
    >
  >(temperCompanionTrait)) {
    for (const [family, esoNumber] of companionNumbers(one)) {
      if (esoNumber === undefined) continue
      companion[`${family}/${esoNumber}`] = one.key
      noted(numbers, one.key, esoNumber)
    }
  }
  const equipNumbers: { [slug: string]: number | undefined } = {}
  for (const one of $pagesOfType<Pick<TemperEquipType, "slug" | "equipType">>(temperEquipType)) {
    equipNumbers[one.slug] = one.equipType
  }
  const jewelry: { [equipType: string]: boolean | undefined } = {}
  for (const one of $pagesOfType<Pick<TemperJewelryType, "slotEquipType">>(temperJewelryType)) {
    const number = equipNumbers[slugIn(one.slotEquipType)]
    if (number !== undefined) jewelry[`${number}`] = true
  }
  return { player, companion, numbers, jewelry }
}

function addonIsJewelry(this: void, equipType: number): boolean {
  return tables().jewelry[`${equipType}`] === true
}

function tables(this: void): TraitTables {
  if (held === undefined) held = tablesOf()
  return held
}

export function addonPlayerTraitOfEso(
  family: GearFamily,
  esoTraitType: number
): string | undefined {
  return tables().player[`${family}/${esoTraitType}`]
}

function addonCompanionTraitOfEso(family: GearFamily, esoTraitType: number): string | undefined {
  return tables().companion[`${family}/${esoTraitType}`]
}

export function addonTraitOfEso(esoTraitType: number, equipType?: number): string | undefined {
  return esoTraitToTemperId(
    {
      player: addonPlayerTraitOfEso,
      companion: addonCompanionTraitOfEso,
      isJewelry: addonIsJewelry,
    },
    esoTraitType,
    equipType
  )
}

export function addonIsCompanionTrait(esoTraitType: number): boolean {
  return isCompanionTraitNumber(addonCompanionTraitOfEso, esoTraitType)
}

export function addonTraitEsoNumbers(traitId: string): readonly number[] {
  return tables().numbers[traitId] ?? []
}

export function addonTraitOptions(this: void): readonly TraitOption[] {
  const found: TraitOption[] = []
  const add = (value: string, label: string): undefined => {
    if (!found.some((one) => one.value === value)) found.push({ value, label })
    return undefined
  }
  for (const one of $pagesOfType<Pick<TemperWeaponTrait, "slug" | "title">>(temperWeaponTrait)) {
    add(one.slug, one.title ?? one.slug)
  }
  for (const one of $pagesOfType<Pick<TemperArmorTrait, "slug" | "title">>(temperArmorTrait)) {
    add(one.slug, one.title ?? one.slug)
  }
  for (const one of $pagesOfType<Pick<TemperJewelryTrait, "slug" | "title">>(temperJewelryTrait)) {
    add(one.slug, one.title ?? one.slug)
  }
  for (const one of $pagesOfType<Pick<TemperCompanionTrait, "key" | "title">>(
    temperCompanionTrait
  )) {
    add(one.key, one.title ?? one.key)
  }
  return found
}
