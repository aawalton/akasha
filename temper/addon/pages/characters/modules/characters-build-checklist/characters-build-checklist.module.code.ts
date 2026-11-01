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
import {
  type ArmoryBuild,
  armoryBuilds,
} from "akasha/temper/addon/pages/characters/modules/characters-armory-pending/characters-armory-pending.module.code.ts"
import { spentAttributes } from "akasha/temper/addon/pages/characters/modules/characters-build-attributes/characters-build-attributes.module.code.ts"
import {
  BAR_SLOT_INDICES,
  slottedNameAt,
} from "akasha/temper/addon/pages/characters/modules/characters-build-bars/characters-build-bars.module.code.ts"
import {
  type DisciplinePlan,
  planDiscipline,
  slottedOf,
} from "akasha/temper/addon/pages/characters/modules/characters-build-champion/characters-build-champion.module.code.ts"
import {
  gearPlaceOf,
  gearText,
  wornMatches,
} from "akasha/temper/addon/pages/characters/modules/characters-build-gear/characters-build-gear.module.code.ts"
import {
  passiveHeld,
  passiveRankWanted,
} from "akasha/temper/addon/pages/characters/modules/characters-build-passives/characters-build-passives.module.code.ts"
import type {
  CharacterTarget,
  TargetBarSlot,
  TargetDiscipline,
  TargetGear,
} from "akasha/temper/player/character/build/modules/character-target-types/character-target-types.module.code.ts"
import { getSavedVariables } from "akasha/temper/player/completion/temper-player-completion/state/modules/completion-saved-variables/completion-saved-variables.module.code.ts"

interface ChecklistLine {
  readonly text: string
  readonly met: boolean
}

export interface ChecklistSection {
  readonly title: string
  readonly lines: readonly ChecklistLine[]
}

const DISCIPLINE_TITLES: Readonly<Record<string, string>> = {
  warfare: "Warfare",
  fitness: "Fitness",
  craft: "Craft",
}

function isCharacterTarget(this: void, value: unknown): value is CharacterTarget {
  if (!isObjectRecord(value)) return false
  return (
    typeof value["buildId"] === "string" &&
    typeof value["title"] === "string" &&
    isObjectRecord(value["attributes"]) &&
    isObjectRecord(value["champion"]) &&
    isObjectRecord(value["bars"]) &&
    isObjectRecord(value["gear"]) &&
    isObjectRecord(value["passives"])
  )
}

export function currentCharacterTargets(): readonly CharacterTarget[] {
  const config: unknown = globalThis.TemperCharactersConfig
  if (!isObjectRecord(config)) return []
  const targets = config["characterTargets"]
  if (!isObjectRecord(targets)) return []
  const listed = targets[GetCurrentCharacterId()]
  if (!Array.isArray(listed)) return []
  return listed.filter(isCharacterTarget)
}

export function currentCharacterBuild(): ArmoryBuild | undefined {
  const targets = currentCharacterTargets()
  if (targets.length === 0) return undefined
  const builds = armoryBuilds(targets)
  const chosen = getSavedVariables().activeBuilds?.[GetCurrentCharacterId()]
  if (chosen === undefined || chosen.over !== targets[0]?.buildId) return builds[0]
  const named = (build: ArmoryBuild): boolean =>
    build.key === chosen.buildId || build.target.correlationId === chosen.buildId
  return builds.find(named) ?? builds[0]
}

export function currentCharacterTarget(): CharacterTarget | undefined {
  return currentCharacterBuild()?.target
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

function slotLines(target: TargetDiscipline): readonly ChecklistLine[] {
  const title = DISCIPLINE_TITLES[target.discipline] ?? target.discipline
  const bound = slottedOf(target.discipline)
  const lines: ChecklistLine[] = []
  for (let at = 0; at < target.slotted.length; at++) {
    const star = target.slotted[at]
    if (star === undefined || star.id === 0) continue
    lines.push({ text: `${title} slot: ${star.name}`, met: bound.includes(star.id) })
  }
  return lines
}

function disciplineLines(target: TargetDiscipline): readonly ChecklistLine[] {
  const title = DISCIPLINE_TITLES[target.discipline] ?? target.discipline
  const plan = planDiscipline(target)
  const full = target.stars.filter(
    (star) => GetNumPointsSpentOnChampionSkill(star.id) >= GetChampionSkillMaxPoints(star.id)
  ).length
  return [
    {
      text: `${title}: ${full} of ${target.stars.length} stars full, the target's points reach ${plan.starsFull}`,
      met: matchesPlan(plan),
    },
    ...slotLines(target),
  ]
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
    lines.push({
      text: `${bar} ${at + 1}: ${wanted.name}`,
      met: slottedNameAt(slot, hotbar) === wanted.name,
    })
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
  const place = gearPlaceOf(gear)
  if (place === undefined) return undefined
  return { text: gearText(gear, place), met: wornMatches(gear, place) }
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

function passivesSection(target: CharacterTarget): ChecklistSection {
  return {
    title: "Passives",
    lines: target.passives.map((passive) => ({
      text: `${passive.name} ${passiveRankWanted(passive)}`,
      met: passiveHeld(passive),
    })),
  }
}

export function savedPartsHeld(target: CharacterTarget): boolean {
  const lines = [
    ...attributesSection(target).lines,
    ...target.champion.flatMap(slotLines),
    ...barsSection(target).lines,
    ...gearSection(target).lines,
  ]
  return lines.every((line) => line.met)
}

export function checklistOf(target: CharacterTarget): readonly ChecklistSection[] {
  return [
    attributesSection(target),
    championSection(target),
    barsSection(target),
    gearSection(target),
    buffsSection(target),
    passivesSection(target),
  ].filter((section) => section.lines.length > 0)
}
