import { currentCharacterEntry } from "akasha/temper/addon/pages/characters/modules/characters-current-entry/characters-current-entry.module.code.ts"
import { heldBarReading } from "akasha/temper/addon/pages/characters/modules/characters-reported-stats/characters-reported-stats.module.code.ts"
import { reavingBlows } from "akasha/temper/catalog/champion-point/temper-champion-star/pages/reaving-blows.temper-champion-star.ts"
import {
  type Multipliers,
  type RotationBar,
  reavingBlowsShareOf,
  rotationReading,
} from "akasha/temper/player/character/stat/modules/rotation-reading/rotation-reading.module.code.ts"
import {
  findIn,
  plainText,
  textPattern,
} from "akasha/temper/player/character/stat/modules/text-pattern/text-pattern.module.code.ts"
import {
  meanArmorShare,
  meanDamageTaken,
  physicalShareOf,
  spellShareOf,
} from "akasha/temper/player/character/stat/modules/toughness-per-second/toughness-per-second.module.code.ts"
import { weaponStyleOfTypes } from "akasha/temper/player/character/stat/modules/weapon-attacks/weapon-attacks.module.code.ts"
import { criticalRating } from "akasha/temper/player/character/stat/temper-metric/pages/critical-rating/critical-rating.temper-metric.ts"
import type { SavedCharacterEntry } from "akasha/temper/player/completion/temper-player-completion/state/modules/completion-saved-variables/completion-saved-variables.module.code.ts"
import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-07/eso-enums-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-08/eso-enums-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-11/eso-enums-11.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-12/eso-enums-12.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-07/eso-functions-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"

type Reading = NonNullable<NonNullable<SavedCharacterEntry["reportedStats"]>["frontBar"]>

type BarKept = NonNullable<SavedCharacterEntry["rotationReading"]>["bars"][number]

type LiveReading = {
  readonly toughness: number
  readonly damage: number
  readonly healing: number
}

const CHAMPION_SLOTS = 12

const PERCENT = 100

const DAMAGE_TAKEN_DOWN = textPattern("{reduces|reducing|reduce} your damage taken by <n>%")

const DAMAGE_TAKEN_UP = textPattern("{increases|increasing|increase} your damage taken by <n>%")

const BARS = [
  ["frontBar", EQUIP_SLOT_MAIN_HAND, EQUIP_SLOT_OFF_HAND],
  ["backBar", EQUIP_SLOT_BACKUP_MAIN, EQUIP_SLOT_BACKUP_OFF],
] as const

function weaponTypeName(slot: number): string | undefined {
  const link = GetItemLink(BAG_WORN, slot)
  if (link === "") return undefined
  const type = GetItemLinkWeaponType(link)
  if (type === WEAPONTYPE_SWORD) return "sword"
  if (type === WEAPONTYPE_AXE) return "axe"
  if (type === WEAPONTYPE_HAMMER) return "mace"
  if (type === WEAPONTYPE_DAGGER) return "dagger"
  if (type === WEAPONTYPE_TWO_HANDED_SWORD) return "greatsword"
  if (type === WEAPONTYPE_TWO_HANDED_AXE) return "battleaxe"
  if (type === WEAPONTYPE_TWO_HANDED_HAMMER) return "maul"
  if (type === WEAPONTYPE_BOW) return "bow"
  if (type === WEAPONTYPE_FIRE_STAFF) return "inferno-staff"
  if (type === WEAPONTYPE_FROST_STAFF) return "ice-staff"
  if (type === WEAPONTYPE_LIGHTNING_STAFF) return "lightning-staff"
  if (type === WEAPONTYPE_HEALING_STAFF) return "restoration-staff"
  return undefined
}

function damageTakenIn(text: string): number {
  const plain = plainText(text)
  const down = findIn(DAMAGE_TAKEN_DOWN, plain)?.[0]
  if (down !== undefined) return -down / PERCENT
  const up = findIn(DAMAGE_TAKEN_UP, plain)?.[0]
  return up === undefined ? 0 : up / PERCENT
}

function damageTakenOf(reading: Reading): number {
  let taken = 0
  for (const buff of reading.activeBuffs ?? []) {
    taken += damageTakenIn(`${buff.effect ?? ""} ${buff.description ?? ""}`)
  }
  for (const boon of reading.archiveBoons ?? []) taken += damageTakenIn(boon.description)
  return taken
}

function liveMultipliers(reading: Reading): Multipliers | undefined {
  const advanced = reading.advanced
  if (advanced === undefined) return undefined
  const stat = (name: string): number => reading.stats[name] ?? 0
  const share = (name: string): number => advanced[name] ?? 0
  const rating = Math.max(stat("critical-rating-weapon"), stat("critical-rating-spell"))
  const chance = Math.min(1, rating / criticalRating.divisor)
  const taken = damageTakenOf(reading)
  return {
    healing:
      (1 + share("healing-done-base")) *
      (1 + share("healing-taken-base")) *
      (1 + chance * share("healing-critical-bonus")),
    damage: 1 + chance * share("critical-damage"),
    healthMaximum: stat("health-maximum"),
    physicalShare: physicalShareOf(stat("resistance-physical")),
    spellShare: spellShareOf(stat("resistance-spell")),
    damageTakenMartial: taken,
    damageTakenMagical: taken,
  }
}

function rotationBarOf(reading: Reading, main: number, off: number): RotationBar {
  const stat = (name: string): number => reading.stats[name] ?? 0
  return {
    skills: reading.skills ?? [],
    classPassives: (reading.classPassives ?? []).map((passive) => passive.description),
    enchants: (reading.worn ?? []).map((piece) => piece.enchant),
    weaponStyle: weaponStyleOfTypes(weaponTypeName(main), weaponTypeName(off)),
    weaponStats: {
      magickaMaximum: stat("magicka-maximum"),
      staminaMaximum: stat("stamina-maximum"),
      powerWeapon: stat("power-weapon"),
      powerSpell: stat("power-spell"),
    },
    multipliers: liveMultipliers(reading),
  }
}

function reavingBlowsShareNow(): number {
  const star = reavingBlows.esoChampionSkillId
  for (let slot = 1; slot <= CHAMPION_SLOTS; slot += 1) {
    if (GetSlotBoundId(slot, HOTBAR_CATEGORY_CHAMPION) === star) {
      return reavingBlowsShareOf(plainText(GetChampionSkillDescription(star)))
    }
  }
  return 0
}

function keptOf(key: BarKept["bar"], bar: RotationBar): BarKept | undefined {
  const multipliers = bar.multipliers
  if (multipliers === undefined) return undefined
  return {
    bar: key,
    weaponStyle: bar.weaponStyle,
    healing: multipliers.healing,
    damage: multipliers.damage,
    healthMaximum: multipliers.healthMaximum,
    armorShare: meanArmorShare(multipliers),
    damageTaken: meanDamageTaken(multipliers),
  }
}

export function liveRotationReading(): LiveReading | undefined {
  const entry = currentCharacterEntry()
  if (entry === undefined) return undefined
  const held = heldBarReading()
  const reported = { ...entry.reportedStats }
  if (held !== undefined) reported[held.bar] = held.reading
  const bars: RotationBar[] = []
  const kept: BarKept[] = []
  for (const [key, main, off] of BARS) {
    const reading = reported[key]
    if (reading?.skills === undefined) continue
    const bar = rotationBarOf(reading, main, off)
    bars.push(bar)
    const one = keptOf(key, bar)
    if (one !== undefined) kept.push(one)
  }
  if (bars.length === 0) return undefined
  const share = reavingBlowsShareNow()
  const read = rotationReading(bars, share)
  const live = {
    toughness: read.toughnessPerSecond,
    damage: read.damagePerSecond,
    healing: read.healingPerSecond,
  }
  entry.rotationReading = {
    capturedAt: GetTimeStamp(),
    ...live,
    reavingBlowsShare: share,
    bars: kept,
  }
  return live
}
