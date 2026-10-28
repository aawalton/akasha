import "akasha/temper/eso/type/eso-enums-08/eso-enums-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-13/eso-enums-13.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import type {
  CharacterTarget,
  TargetGear,
} from "akasha/temper/player/character/build/modules/character-target-types/character-target-types.module.code.ts"

const EQUIP_GAP_MS = 500

const onlyType = (equipType: number): readonly number[] => [equipType]

const MAIN_HAND_TYPES = [EQUIP_TYPE_ONE_HAND, EQUIP_TYPE_TWO_HAND, EQUIP_TYPE_MAIN_HAND]

const OFF_HAND_TYPES = [EQUIP_TYPE_ONE_HAND, EQUIP_TYPE_OFF_HAND]

interface GearPlace {
  readonly equipSlot: number
  readonly name: string
  readonly fits: readonly number[]
}

const GEAR_PLACES: Readonly<Record<string, GearPlace>> = {
  head: { equipSlot: EQUIP_SLOT_HEAD, name: "Head", fits: onlyType(EQUIP_TYPE_HEAD) },
  shoulders: {
    equipSlot: EQUIP_SLOT_SHOULDERS,
    name: "Shoulders",
    fits: onlyType(EQUIP_TYPE_SHOULDERS),
  },
  chest: { equipSlot: EQUIP_SLOT_CHEST, name: "Chest", fits: onlyType(EQUIP_TYPE_CHEST) },
  hands: { equipSlot: EQUIP_SLOT_HAND, name: "Hands", fits: onlyType(EQUIP_TYPE_HAND) },
  waist: { equipSlot: EQUIP_SLOT_WAIST, name: "Waist", fits: onlyType(EQUIP_TYPE_WAIST) },
  legs: { equipSlot: EQUIP_SLOT_LEGS, name: "Legs", fits: onlyType(EQUIP_TYPE_LEGS) },
  feet: { equipSlot: EQUIP_SLOT_FEET, name: "Feet", fits: onlyType(EQUIP_TYPE_FEET) },
  necklace: { equipSlot: EQUIP_SLOT_NECK, name: "Necklace", fits: onlyType(EQUIP_TYPE_NECK) },
  "ring-1": { equipSlot: EQUIP_SLOT_RING1, name: "Ring", fits: onlyType(EQUIP_TYPE_RING) },
  "ring-2": { equipSlot: EQUIP_SLOT_RING2, name: "Ring", fits: onlyType(EQUIP_TYPE_RING) },
  "primary-main-hand": {
    equipSlot: EQUIP_SLOT_MAIN_HAND,
    name: "Main hand",
    fits: MAIN_HAND_TYPES,
  },
  "primary-off-hand": { equipSlot: EQUIP_SLOT_OFF_HAND, name: "Off hand", fits: OFF_HAND_TYPES },
  "backup-main-hand": {
    equipSlot: EQUIP_SLOT_BACKUP_MAIN,
    name: "Backup main hand",
    fits: MAIN_HAND_TYPES,
  },
  "backup-off-hand": {
    equipSlot: EQUIP_SLOT_BACKUP_OFF,
    name: "Backup off hand",
    fits: OFF_HAND_TYPES,
  },
}

export function gearPlaceOf(gear: TargetGear): GearPlace | undefined {
  return GEAR_PLACES[gear.slot]
}

export function gearText(gear: TargetGear, place: GearPlace): string {
  const traitText = gear.traitName === "" ? "" : ` (${gear.traitName})`
  return `${place.name}: ${gear.setName}${traitText}`
}

function holdsGear(bag: Bag, slotIndex: number, gear: TargetGear): boolean {
  const [, , , , , setId] = GetItemLinkSetInfo(GetItemLink(bag, slotIndex))
  return setId === gear.setId && (gear.trait === 0 || GetItemTrait(bag, slotIndex) === gear.trait)
}

export function wornMatches(gear: TargetGear, place: GearPlace): boolean {
  return holdsGear(BAG_WORN, place.equipSlot, gear)
}

function inBackpack(gear: TargetGear, place: GearPlace, taken: LuaSet<number>): number | undefined {
  let at = ZO_GetNextBagSlotIndex(BAG_BACKPACK, undefined)
  while (at !== undefined) {
    const fits = place.fits.includes(GetItemLinkEquipType(GetItemLink(BAG_BACKPACK, at)))
    if (!taken.has(at) && fits && holdsGear(BAG_BACKPACK, at, gear)) return at
    at = ZO_GetNextBagSlotIndex(BAG_BACKPACK, at)
  }
  return undefined
}

function equipNext(gear: readonly TargetGear[], stepsLeft: number): undefined {
  if (stepsLeft <= 0 || IsUnitInCombat("player")) return undefined
  for (const one of gear) {
    const place = gearPlaceOf(one)
    if (place === undefined || wornMatches(one, place)) continue
    const from = inBackpack(one, place, new LuaSet<number>())
    if (from === undefined) continue
    RequestEquipItem(BAG_BACKPACK, from, BAG_WORN, place.equipSlot)
    zo_callLater(() => equipNext(gear, stepsLeft - 1), EQUIP_GAP_MS)
    return undefined
  }
  return undefined
}

export function applyGearTarget(target: CharacterTarget): string {
  if (IsUnitInCombat("player")) return "Gear waits until you are out of combat."
  const taken = new LuaSet<number>()
  const missing: string[] = []
  let found = 0
  for (const one of target.gear) {
    const place = gearPlaceOf(one)
    if (place === undefined || wornMatches(one, place)) continue
    const from = inBackpack(one, place, taken)
    if (from === undefined) missing.push(gearText(one, place))
    else {
      taken.add(from)
      found++
    }
  }
  equipNext(target.gear, found)
  const said = [`${found} ${found === 1 ? "piece" : "pieces"} to equip.`]
  if (missing.length > 0) said.push(`Not in your backpack: ${missing.join(", ")}.`)
  return said.join(" ")
}
