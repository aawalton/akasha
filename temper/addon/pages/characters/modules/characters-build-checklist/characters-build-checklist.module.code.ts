import "akasha/temper/eso/type/eso-enums-08/eso-enums-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-13/eso-enums-13.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-07/eso-functions-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/addon/pages/characters/characters-config-declarations/characters-config-declarations.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import { isObjectRecord } from "akasha/code/type/narrowing/modules/is-object-record/is-object-record.module.code.ts"
import { spentAttributes } from "akasha/temper/addon/pages/characters/modules/characters-build-attributes/characters-build-attributes.module.code.ts"
import {
  type DisciplinePlan,
  planDiscipline,
  slottedOf,
} from "akasha/temper/addon/pages/characters/modules/characters-build-champion/characters-build-champion.module.code.ts"
import type {
  CharacterTarget,
  TargetBarSlot,
  TargetDiscipline,
  TargetGear,
} from "akasha/temper/player/character/build/modules/character-target-types/character-target-types.module.code.ts"

export interface ChecklistLine {
  readonly text: string
  readonly met: boolean
}

export interface ChecklistSection {
  readonly title: string
  readonly lines: readonly ChecklistLine[]
}

const BAR_SLOT_INDICES = [3, 4, 5, 6, 7, 8]

const DISCIPLINE_TITLES: Readonly<Record<string, string>> = {
  warfare: "Warfare",
  fitness: "Fitness",
  craft: "Craft",
}

const GEAR_SLOTS: Readonly<Record<string, readonly [number, string]>> = {
  head: [EQUIP_SLOT_HEAD, "Head"],
  shoulders: [EQUIP_SLOT_SHOULDERS, "Shoulders"],
  chest: [EQUIP_SLOT_CHEST, "Chest"],
  hands: [EQUIP_SLOT_HAND, "Hands"],
  waist: [EQUIP_SLOT_WAIST, "Waist"],
  legs: [EQUIP_SLOT_LEGS, "Legs"],
  feet: [EQUIP_SLOT_FEET, "Feet"],
  necklace: [EQUIP_SLOT_NECK, "Necklace"],
  "ring-1": [EQUIP_SLOT_RING1, "Ring"],
  "ring-2": [EQUIP_SLOT_RING2, "Ring"],
  "primary-main-hand": [EQUIP_SLOT_MAIN_HAND, "Main hand"],
  "primary-off-hand": [EQUIP_SLOT_OFF_HAND, "Off hand"],
  "backup-main-hand": [EQUIP_SLOT_BACKUP_MAIN, "Backup main hand"],
  "backup-off-hand": [EQUIP_SLOT_BACKUP_OFF, "Backup off hand"],
}

function isCharacterTarget(value: unknown): value is CharacterTarget {
  if (!isObjectRecord(value)) return false
  return (
    typeof value["title"] === "string" &&
    isObjectRecord(value["attributes"]) &&
    isObjectRecord(value["champion"]) &&
    isObjectRecord(value["bars"]) &&
    isObjectRecord(value["gear"])
  )
}

export function currentCharacterTarget(): CharacterTarget | undefined {
  const config: unknown = globalThis.TemperCharactersConfig
  if (!isObjectRecord(config)) return undefined
  const targets = config["characterTargets"]
  if (!isObjectRecord(targets)) return undefined
  const target = targets[GetCurrentCharacterId()]
  return isCharacterTarget(target) ? target : undefined
}

function attributesSection(target: CharacterTarget): ChecklistSection {
  const spent = spentAttributes()
  const line = (name: string, have: number, want: number): ChecklistLine => ({
    text: `${name}: ${have} of ${want}`,
    met: have === want,
  })
  return {
    title: "Attributes",
    lines: [
      line("Health", spent.health, target.attributes.health),
      line("Magicka", spent.magicka, target.attributes.magicka),
      line("Stamina", spent.stamina, target.attributes.stamina),
    ],
  }
}

function matchesPlan(plan: DisciplinePlan): boolean {
  return plan.skillIds.every(
    (skillId) => (plan.points.get(skillId) ?? 0) === GetNumPointsSpentOnChampionSkill(skillId)
  )
}

function disciplineLines(target: TargetDiscipline): readonly ChecklistLine[] {
  const title = DISCIPLINE_TITLES[target.discipline] ?? target.discipline
  const plan = planDiscipline(target)
  const full = target.stars.filter(
    (star) => GetNumPointsSpentOnChampionSkill(star.id) >= GetChampionSkillMaxPoints(star.id)
  ).length
  const lines: ChecklistLine[] = [
    {
      text: `${title}: ${full} of ${target.stars.length} stars full, the target's points reach ${plan.starsFull}`,
      met: matchesPlan(plan),
    },
  ]
  const bound = slottedOf(target.discipline)
  for (let at = 0; at < target.slotted.length; at++) {
    const star = target.slotted[at]
    if (star === undefined || star.id === 0) continue
    lines.push({ text: `${title} slot: ${star.name}`, met: bound.includes(star.id) })
  }
  return lines
}

function championSection(target: CharacterTarget): ChecklistSection {
  const lines: ChecklistLine[] = []
  for (const discipline of target.champion) lines.push(...disciplineLines(discipline))
  return { title: "Champion points", lines }
}

function barLines(
  slots: readonly TargetBarSlot[],
  hotbar: HotBarCategory,
  bar: string
): ChecklistLine[] {
  const lines: ChecklistLine[] = []
  for (let at = 0; at < slots.length; at++) {
    const wanted = slots[at]
    const slot = BAR_SLOT_INDICES[at]
    if (wanted === undefined || slot === undefined || wanted.name === "") continue
    const slotted = zo_strformat("<<1>>", GetSlotName(slot, hotbar))
    lines.push({ text: `${bar} ${at + 1}: ${wanted.name}`, met: slotted === wanted.name })
  }
  return lines
}

function barsSection(target: CharacterTarget): ChecklistSection {
  return {
    title: "Skill bars",
    lines: [
      ...barLines(target.bars.primary, HOTBAR_CATEGORY_PRIMARY, "Front"),
      ...barLines(target.bars.backup, HOTBAR_CATEGORY_BACKUP, "Back"),
    ],
  }
}

function gearLine(gear: TargetGear): ChecklistLine | undefined {
  const placed = GEAR_SLOTS[gear.slot]
  if (placed === undefined) return undefined
  const [equipSlot, slotName] = placed
  const [, , , , , setId] = GetItemLinkSetInfo(GetItemLink(BAG_WORN, equipSlot))
  const trait = GetItemTrait(BAG_WORN, equipSlot)
  const traitText = gear.traitName === "" ? "" : ` (${gear.traitName})`
  return {
    text: `${slotName}: ${gear.setName}${traitText}`,
    met: setId === gear.setId && (gear.trait === 0 || trait === gear.trait),
  }
}

function gearSection(target: CharacterTarget): ChecklistSection {
  const lines: ChecklistLine[] = []
  for (const gear of target.gear) {
    const line = gearLine(gear)
    if (line !== undefined) lines.push(line)
  }
  return { title: "Gear", lines }
}

function activeBuffIds(): LuaSet<number> {
  const held = new LuaSet<number>()
  const count = GetNumBuffs("player")
  for (let at = 1; at <= count; at++) {
    const [, , , , , , , , , , abilityId] = GetUnitBuffInfo("player", at)
    held.add(abilityId)
  }
  return held
}

function buffsSection(target: CharacterTarget): ChecklistSection {
  const buffs = activeBuffIds()
  const lines: ChecklistLine[] = []
  if (target.mundus !== undefined) {
    lines.push({ text: `Mundus: ${target.mundus.name}`, met: buffs.has(target.mundus.abilityId) })
  }
  if (target.food !== undefined) {
    lines.push({ text: `Food: ${target.food.name}`, met: buffs.has(target.food.abilityId) })
  }
  return { title: "Mundus and food", lines }
}

export function checklistOf(target: CharacterTarget): readonly ChecklistSection[] {
  return [
    attributesSection(target),
    championSection(target),
    barsSection(target),
    gearSection(target),
    buffsSection(target),
  ].filter((section) => section.lines.length > 0)
}
