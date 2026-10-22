import { championPoints } from "akasha/temper/catalog/champion-point/modules/champion-point-source/champion-point-source.module.code.ts"
import type { CompanionState } from "akasha/temper/catalog/companion/companions-core/modules/companion-types/companion-types.module.code.ts"
import type { CharacterState } from "akasha/temper/player/character/build/modules/build-types/build-types.module.code.ts"
import { skills } from "akasha/temper/player/character/skill/modules/character-skills/character-skills.module.code.ts"
import { skillCatalog } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.code.ts"
import { getSkillLineCategory } from "akasha/temper/player/character/skill/modules/passive-queries/passive-queries.module.code.ts"
import { calculateBuildStatsByBar } from "akasha/temper/player/character/stat/modules/metric-calculator/metric-calculator.module.code.ts"

export type Field = {
  readonly section: string
  readonly key: string
  readonly value: string | number
}

export type StarPoints = {
  readonly championSkillId: number
  readonly points: number
  readonly maxPoints: number
}

export const SHEET_STATS = [
  "health-maximum",
  "magicka-maximum",
  "stamina-maximum",
  "health-recovery",
  "magicka-recovery",
  "stamina-recovery",
  "power-spell",
  "power-weapon",
  "critical-rating-spell",
  "critical-rating-weapon",
  "penetration-spell",
  "penetration-physical",
  "resistance-spell",
  "resistance-physical",
  "resistance-critical",
] as const

const BARS = [
  ["front", "primary-weapon-bar", "primary-skill-bar"],
  ["back", "backup-weapon-bar", "backup-skill-bar"],
] as const

const NONE = new Set([
  "no-set",
  "no-type",
  "no-weight",
  "no-trait",
  "no-enchant",
  "no-enchantment",
  "no-poison",
  "no-quality",
])

type Item = {
  readonly set?: string
  readonly type?: string
  readonly weight?: string
  readonly trait?: string
  readonly enchantment?: string
  readonly enchantmentQuality?: string
  readonly quality?: string
  readonly poison?: string
}

function said(one: string | undefined): one is string {
  return one !== undefined && !NONE.has(one)
}

export function itemText(item: Item | null): string {
  if (item === null || (!said(item.type) && !said(item.set))) return "empty"
  const quality = said(item.enchantmentQuality) ? ` (${item.enchantmentQuality})` : ""
  const enchant = said(item.enchantment) ? `enchant ${item.enchantment}${quality}` : "no enchant"
  const weight = said(item.weight) && item.weight !== item.type ? `${item.weight} ` : ""
  return [
    ...(item.set === undefined ? [] : [said(item.set) ? item.set : "no set"]),
    ...(said(item.type) ? [`${weight}${item.type}`] : []),
    said(item.quality) ? item.quality : "no quality",
    said(item.trait) ? item.trait : "no trait",
    ...(item.enchantment === undefined ? [] : [enchant]),
    ...(said(item.poison) ? [`poison ${item.poison}`] : []),
  ].join(", ")
}

function skillText(id: string): string {
  return id === "no-skill" ? "empty" : id
}

function characterLines(build: CharacterState): readonly Field[] {
  const one = build.character
  const section = "character"
  return [
    { section, key: "class", value: one.class },
    { section, key: "race", value: one.race },
    { section, key: "alliance", value: one.alliance },
    { section, key: "magicka attribute points", value: one.attributes.magicka },
    { section, key: "health attribute points", value: one.attributes.health },
    { section, key: "stamina attribute points", value: one.attributes.stamina },
    { section, key: "mundus", value: one.mundusStone },
    { section, key: "curse", value: one.curseState },
    { section, key: "vampire stage", value: one.vampireStage },
    { section, key: "skill lines chosen", value: one.skillLineIds.join(", ") || "none" },
    ...(one.roles.length === 0 ? [] : [{ section, key: "roles", value: one.roles.join(", ") }]),
  ]
}

function otherLines(build: CharacterState): readonly Field[] {
  const { consumables, target, account } = build
  return [
    { section: "consumables", key: "food or drink", value: consumables.foodOrDrink },
    { section: "consumables", key: "potion", value: consumables.potion },
    { section: "consumables", key: "second potion", value: consumables.potion2 },
    { section: "target", key: "armor", value: target.armor },
    { section: "target", key: "health", value: `${String(Math.round(target.health * 100))}%` },
    { section: "account", key: "eso plus", value: account.esoPlus },
  ]
}

function gearLines(build: CharacterState): readonly Field[] {
  const { equipment } = build
  const section = "gear"
  const armor = Object.entries(equipment.armor).map(([slot, held]) => ({
    section,
    key: slot,
    value: itemText(held.data),
  }))
  const jewelry = Object.entries(equipment.jewelry).map(([slot, held]) => ({
    section,
    key: slot,
    value: itemText(held.data),
  }))
  const weapons = BARS.flatMap(([bar, weaponBar]) =>
    Object.entries(equipment[weaponBar]).map(([slot, held]) => ({
      section,
      key: `${bar} ${slot}`,
      value: itemText(held.data),
    }))
  )
  return [...armor, ...jewelry, ...weapons]
}

function skillLines(build: CharacterState): readonly Field[] {
  const bars = BARS.flatMap(([bar, , skillBar]) =>
    Object.entries(build.skills[skillBar]).map(([slot, id]) => ({
      section: `skills: ${bar} bar`,
      key: slot,
      value: skillText(id),
    }))
  )
  const scribed = build.scribing.map((one) => ({
    section: "scribing",
    key: one.skillId,
    value: `grimoire ${one.grimoireId}, focus ${one.focusScriptId}, signature ${one.signatureScriptId}, affix ${one.affixScriptId}`,
  }))
  return [...bars, ...scribed]
}

type Passive = { readonly id: string; readonly category: string; readonly line: string }

function passiveOf(id: string): Passive {
  const skill = skills.has(id) ? skills.data[id] : undefined
  if (skill === undefined) return { id, category: "unknown", line: "not in the skill catalog" }
  return { id, category: getSkillLineCategory(skill.skillLineId), line: skill.skillLineId }
}

function passiveLines(build: CharacterState): readonly Field[] {
  const ranks: Readonly<Record<string, number | undefined>> = build.passiveRanks ?? {}
  return build.passives
    .map(passiveOf)
    .sort(
      (one, two) =>
        one.category.localeCompare(two.category) ||
        one.line.localeCompare(two.line) ||
        one.id.localeCompare(two.id)
    )
    .map((one) => {
      const rank = ranks[one.id]
      const stated = rank === undefined ? "no rank stated" : `rank ${String(rank)}`
      return { section: `passives: ${one.category}`, key: one.id, value: `${stated}, ${one.line}` }
    })
}

function masteryLines(build: CharacterState): readonly Field[] {
  const section = "masteries"
  const chosen = build.masteries ?? []
  if (chosen.length === 0) return [{ section, key: "chosen", value: "none" }]
  const masteries = skillCatalog().classMasteries
  return chosen.map((id) => ({
    section,
    key: id,
    value: masteries.data[id]?.classId ?? "not in the class mastery catalog",
  }))
}

const CONSTELLATIONS = ["warfare", "fitness", "craft"] as const

function pointsText(star: StarPoints | undefined, known: boolean): string {
  if (!known) return "points not in the hash"
  if (star === undefined) return "no points"
  return `${String(star.points)} of ${String(star.maxPoints)} points`
}

function starLines(build: CharacterState, stars: readonly StarPoints[] | null): readonly Field[] {
  const byGame = new Map(championPoints.list.map((star) => [star.esoChampionSkillId, star.id]))
  const spent = new Map<string, StarPoints>()
  for (const star of stars ?? []) {
    const id = byGame.get(star.championSkillId)
    if (id !== undefined && star.points > 0) spent.set(id, star)
  }
  const constellationOf: ReadonlyMap<string, string> = new Map(
    championPoints.list.map((star) => [star.id, star.subcategoryId.split("-")[0] ?? ""])
  )
  return CONSTELLATIONS.flatMap((constellation): readonly Field[] => {
    const held = build.championPoints[constellation]
    const section = `champion stars: ${constellation}`
    const passive: readonly string[] = held.passive
    const slotted: readonly string[] = held.slotted.filter(
      (id) => constellationOf.get(id) === constellation
    )
    const named: string[] = [...new Set([...slotted, ...passive])]
    for (const [id] of spent) {
      if (constellationOf.get(id) === constellation && !named.includes(id)) named.push(id)
    }
    const total = [...spent]
      .filter(([id]) => constellationOf.get(id) === constellation)
      .reduce((sum, [, star]) => sum + star.points, 0)
    return [
      { section, key: "points spent", value: stars === null ? "not in the hash" : total },
      ...named.map((id) => {
        const how = slotted.includes(id)
          ? "slotted"
          : passive.includes(id)
            ? "passive"
            : "not in the build"
        return { section, key: id, value: `${how}, ${pointsText(spent.get(id), stars !== null)}` }
      }),
    ]
  })
}

function statLines(build: CharacterState): readonly Field[] {
  return BARS.flatMap(([bar, weaponBar]): readonly Field[] => {
    const section = `stats (Temper): ${bar} bar`
    let metrics: Readonly<Record<string, { readonly value: number } | undefined>>
    try {
      metrics = calculateBuildStatsByBar(build, weaponBar).metrics
    } catch (thrown) {
      return [{ section, key: "not worked out", value: String(thrown) }]
    }
    return SHEET_STATS.map((stat) => ({ section, key: stat, value: metrics[stat]?.value ?? 0 }))
  })
}

export function characterFieldsOf(
  build: CharacterState,
  stars: readonly StarPoints[] | null
): readonly Field[] {
  return [
    ...characterLines(build),
    ...otherLines(build),
    ...gearLines(build),
    ...skillLines(build),
    ...passiveLines(build),
    ...masteryLines(build),
    ...starLines(build, stars),
    ...statLines(build),
  ]
}

export function companionFieldsOf(build: CompanionState): readonly Field[] {
  const { equipment } = build
  const gear = [
    ...Object.entries(equipment.armor),
    ...Object.entries(equipment.jewelry),
    ...Object.entries(equipment.weapons),
  ].map(([slot, held]) => ({ section: "gear", key: slot, value: itemText(held.data) }))
  return [
    { section: "companion", key: "companion", value: build.companion.id },
    {
      section: "companion",
      key: "base roles",
      value: build.companion.baseRoles.join(", ") || "none",
    },
    ...gear,
    ...Object.entries(build.skills["skill-bar"]).map(([slot, id]) => ({
      section: "skills",
      key: slot,
      value: skillText(id),
    })),
    { section: "target", key: "armor", value: build.target.armor },
    { section: "target", key: "health", value: build.target.targetHealth },
  ]
}

type Difference = {
  readonly section: string
  readonly key: string
  readonly first: string | number | null
  readonly second: string | number | null
}

function placeOf(one: Pick<Field, "section" | "key">): string {
  return `${one.section}\u0000${one.key}`
}

export function differencesOf(
  first: readonly Field[],
  second: readonly Field[]
): readonly Difference[] {
  const held = new Map(second.map((one) => [placeOf(one), one]))
  const seen = new Set<string>()
  const found: Difference[] = []
  for (const one of first) {
    const place = placeOf(one)
    seen.add(place)
    const other = held.get(place)
    if (other?.value === one.value) continue
    found.push({
      section: one.section,
      key: one.key,
      first: one.value,
      second: other?.value ?? null,
    })
  }
  for (const other of second) {
    if (seen.has(placeOf(other))) continue
    found.push({ section: other.section, key: other.key, first: null, second: other.value })
  }
  const sections = [...new Set([...first, ...second].map((one) => one.section))]
  return found.sort((one, two) => sections.indexOf(one.section) - sections.indexOf(two.section))
}

export function fieldLines(fields: readonly Field[]): readonly string[] {
  const lines: string[] = []
  let section: string | null = null
  const width = Math.max(4, ...fields.map((one) => one.key.length))
  for (const one of fields) {
    if (one.section !== section) {
      section = one.section
      lines.push(section)
    }
    lines.push(`  ${one.key.padEnd(width)}  ${String(one.value)}`)
  }
  return lines
}

function valueText(value: string | number | null): string {
  return value === null ? "(none)" : String(value)
}

export function differenceLines(differences: readonly Difference[]): readonly string[] {
  const lines: string[] = []
  const sections = [...new Set(differences.map((one) => one.section))]
  for (const section of sections) {
    lines.push(section)
    for (const one of differences.filter((difference) => difference.section === section)) {
      lines.push(`  ${one.key}`, `    - ${valueText(one.first)}`, `    + ${valueText(one.second)}`)
    }
  }
  return lines
}

export function sectionsOf(
  fields: readonly Field[]
): Readonly<Record<string, Readonly<Record<string, string | number>>>> {
  const sections: Record<string, Record<string, string | number>> = {}
  for (const one of fields) {
    const section = sections[one.section] ?? {}
    section[one.key] = one.value
    sections[one.section] = section
  }
  return sections
}
