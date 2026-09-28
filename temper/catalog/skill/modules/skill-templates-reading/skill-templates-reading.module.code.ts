import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { temperBuffMajor } from "akasha/temper/catalog/effect/temper-buff-major/temper-buff-major.page-type.ts"
import { temperBuffMinor } from "akasha/temper/catalog/effect/temper-buff-minor/temper-buff-minor.page-type.ts"
import { temperBuffOther } from "akasha/temper/catalog/effect/temper-buff-other/temper-buff-other.page-type.ts"
import {
  GEAR_READS,
  holdGear,
} from "akasha/temper/catalog/gear/equipment/modules/gear-reading/gear-reading.module.code.ts"
import { temperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.ts"
import { temperSkillLineCategory } from "akasha/temper/catalog/skill/line-category/temper-skill-line-category.page-type.ts"
import { temperAffixScript } from "akasha/temper/catalog/skill/temper-affix-script/temper-affix-script.page-type.ts"
import { temperClass } from "akasha/temper/catalog/skill/temper-class/temper-class.page-type.ts"
import { temperFocusScript } from "akasha/temper/catalog/skill/temper-focus-script/temper-focus-script.page-type.ts"
import { temperGrimoire } from "akasha/temper/catalog/skill/temper-grimoire/temper-grimoire.page-type.ts"
import { temperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.ts"
import { temperSignatureScript } from "akasha/temper/catalog/skill/temper-signature-script/temper-signature-script.page-type.ts"
import { temperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.ts"
import { temperSkillType } from "akasha/temper/catalog/skill/type/temper-skill-type.page-type.ts"
import {
  holdSkillBars,
  skillBarsOf,
} from "akasha/temper/catalog/skill-kind/modules/skill-bars/skill-bars.module.code.ts"
import { temperRace } from "akasha/temper/catalog/world/temper-race/temper-race.page-type.ts"
import type { SkillLineTemplate } from "akasha/temper/player/character/skill/line/modules/skill-line-template/skill-line-template.module.code.ts"
import type { SkillTemplate } from "akasha/temper/player/character/skill/modules/character-skill-template/character-skill-template.module.code.ts"
import type { GrimoireTemplate } from "akasha/temper/player/character/skill/modules/grimoire-template/grimoire-template.module.code.ts"
import type { ScribedSkillTemplate } from "akasha/temper/player/character/skill/modules/scribed-skill-template/scribed-skill-template.module.code.ts"
import {
  CHARACTER_SOURCE_READS,
  holdCharacterSources,
} from "akasha/temper/player/character/source/modules/character-source-reading/character-source-reading.module.code.ts"
import { temperSkillBar } from "akasha/temper/player/character/temper-skill-bar/temper-skill-bar.page-type.ts"
import {
  COMPLETION_PAGE_READS,
  holdCompletionPages,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-page-reading/completion-page-reading.module.code.ts"
import { temperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.ts"

const SKILL_KEYED_BY: readonly (readonly [string, string])[] = [
  [temperSkillLine.slug, "key"],
  [temperSkillType.slug, "key"],
  [temperGrimoire.slug, "key"],
  [temperFocusScript.slug, "key"],
  [temperSignatureScript.slug, "key"],
  [temperAffixScript.slug, "key"],
  [temperClass.slug, "key"],
  [temperSkillLineCategory.slug, "key"],
  [temperBuffMajor.slug, "key"],
  [temperBuffMinor.slug, "key"],
  [temperBuffOther.slug, "key"],
  [temperMetricTree.slug, "nodeId"],
]

const SKILL_FIELDS: readonly string[] = [
  "slug",
  "key",
  "title",
  "baseName",
  "description",
  "icon",
  "esoSkillId",
  "isMorph",
  "morphIndex",
  "lineRankNeeded",
  "rank",
  "skillLineId",
  "skillType",
  "status",
  "effects",
  "hashPlace",
]

const SCRIBED_SKILL_FIELDS: readonly string[] = [...SKILL_FIELDS, "grimoireId", "focusScriptId"]

const NO_SKILL = "no-skill"

const SCRIBED = "scribed"

const NONE = "none"

const RENAMED: Readonly<Record<string, string>> = { type: "effectType", value: "effectValue" }

const FOREVER = "seconds"

export class SkillUnkeyed extends Error {}

type SkillKeys = {
  readonly names: (said: unknown) => boolean
  readonly of: (said: unknown, where: string) => string
}

export function skillKeysIn(rowsOf: (pageTypeSlug: string) => Iterable<Value>): SkillKeys {
  const held = new Map<string, string>()
  for (const [pageTypeSlug, field] of SKILL_KEYED_BY) {
    for (const row of rowsOf(pageTypeSlug)) {
      const key = row[field]
      if (typeof row.slug === "string" && typeof key === "string") {
        held.set(`${pageTypeSlug}/${row.slug}`, key)
      }
    }
  }
  const kinds = new Set(SKILL_KEYED_BY.map(([pageTypeSlug]) => pageTypeSlug))
  return {
    names: (said) => typeof said === "string" && kinds.has(said.split("/")[0] ?? ""),
    of: (said, where) => {
      const found = typeof said === "string" ? held.get(said) : undefined
      if (found !== undefined) return found
      throw new SkillUnkeyed(`${where} names \`${String(said)}\`, and that page states no key`)
    },
  }
}

function textOf(said: unknown): string {
  if (typeof said !== "string" || !said.startsWith('"')) return String(said ?? "")
  try {
    const inner: unknown = JSON.parse(said)
    return typeof inner === "string" ? inner : said
  } catch {
    return said
  }
}

function effectOf(effect: Value, keys: SkillKeys, where: string): Value {
  const read: Record<string, unknown> = {}
  for (const [field, said] of Object.entries(effect)) {
    if (field === "id") continue
    const value = field === FOREVER && said === null ? Number.POSITIVE_INFINITY : said
    read[RENAMED[field] ?? field] = keys.names(value) ? keys.of(value, where) : value
  }
  return read
}

function rowsIn(said: unknown): readonly Value[] {
  if (!Array.isArray(said)) return []
  return said.filter((one): one is Value => typeof one === "object" && one !== null)
}

function skillOf(row: Value, keys: SkillKeys): SkillTemplate {
  const where = `the skill page \`${String(row.slug)}\``
  const id = String(row.key)
  const skillLineId = keys.of(row.skillLineId, where)
  return {
    id,
    esoSkillId: row.esoSkillId,
    name: row.title,
    baseName: row.baseName,
    skillLineId,
    skillType: keys.of(row.skillType, where),
    description: textOf(row.description),
    icon: typeof row.icon === "string" ? row.icon : null,
    isMorph: row.isMorph,
    morphIndex: row.morphIndex,
    lineRankNeeded: row.lineRankNeeded,
    rank: row.rank,
    subcategoryId: id === NO_SKILL ? NONE : skillLineId,
    ...(Array.isArray(row.effects)
      ? { effects: rowsIn(row.effects).map((effect) => effectOf(effect, keys, where)) }
      : {}),
    ...(typeof row.status === "string" ? { status: row.status } : {}),
  } as SkillTemplate
}

function scribedOf(row: Value, keys: SkillKeys): ScribedSkillTemplate {
  const where = `the scribed skill page \`${String(row.slug)}\``
  return {
    ...skillOf(row, keys),
    subcategoryId: SCRIBED,
    grimoireId: keys.of(row.grimoireId, where),
    focusScriptId: keys.of(row.focusScriptId, where),
  } as ScribedSkillTemplate
}

function inPlace<Row extends Value>(rows: Iterable<Row>): readonly Row[] {
  const place = (row: Row): number => Number(row.hashPlace ?? Number.POSITIVE_INFINITY)
  return [...rows].sort(
    (one, other) => place(one) - place(other) || String(one.slug).localeCompare(String(other.slug))
  )
}

type SkillTemplates = {
  readonly skills: readonly SkillTemplate[]
  readonly scribedSkills: readonly ScribedSkillTemplate[]
}

const SCRIPT_FIELDS: readonly string[] = [
  "slug",
  "key",
  "title",
  "icon",
  "slotType",
  "itemId",
  "uespId",
  "hashPlace",
]

export type ScriptTemplate = {
  readonly id: string
  readonly name: string
  readonly icon: string
  readonly slotType: string
  readonly itemId: number
  readonly uespId: number
}

function scriptOf(row: Value): ScriptTemplate {
  return {
    id: String(row.key),
    name: String(row.title),
    icon: typeof row.icon === "string" ? row.icon : "",
    slotType: String(row.slotType),
    itemId: Number(row.itemId),
    uespId: Number(row.uespId),
  }
}

function scriptTemplatesOf(rows: Iterable<Value>): readonly ScriptTemplate[] {
  return inPlace(rows).map(scriptOf)
}

export function skillTemplatesOf(
  skills: Iterable<Value>,
  scribed: Iterable<Value>,
  keys: SkillKeys
): SkillTemplates {
  const scribedRows = inPlace(scribed)
  const scribedKeys = new Set(scribedRows.map((row) => row.key))
  const scribedSkills = scribedRows.map((row) => scribedOf(row, keys))
  const byKey = new Map<unknown, SkillTemplate>(scribedSkills.map((skill) => [skill.id, skill]))
  const every = inPlace([...skills].filter((row) => !scribedKeys.has(row.key)).concat(scribedRows))
  return {
    skills: every.map((row) => byKey.get(row.key) ?? skillOf(row, keys)),
    scribedSkills,
  }
}

const GRIMOIRE_FIELDS: readonly string[] = [
  "slug",
  "key",
  "title",
  "icon",
  "abilityIcon",
  "itemId",
  "uespId",
  "skillLineId",
  "focusScripts",
  "signatureScripts",
  "affixScripts",
  "hashPlace",
]

type ScriptVariant = {
  readonly scriptId: string
  readonly description: string
  readonly classId?: string
}

function variantOf(row: Value, keys: SkillKeys, where: string): ScriptVariant {
  return {
    scriptId: keys.of(row.scriptId, where),
    description: textOf(row.description),
    ...(row.classId === undefined || row.classId === null
      ? {}
      : { classId: keys.of(row.classId, where) }),
  }
}

function grimoireOf(row: Value, keys: SkillKeys): GrimoireTemplate {
  const where = `the grimoire page \`${String(row.slug)}\``
  const signatures = rowsIn(row.signatureScripts).map((one) => variantOf(one, keys, where))
  const affixes = rowsIn(row.affixScripts).map((one) => variantOf(one, keys, where))
  const focuses: readonly unknown[] = Array.isArray(row.focusScripts) ? row.focusScripts : []
  return {
    id: String(row.key),
    name: String(row.title),
    icon: String(row.icon),
    abilityIcon: String(row.abilityIcon),
    skillLineId: keys.of(row.skillLineId, where),
    itemId: Number(row.itemId),
    uespId: Number(row.uespId),
    compatibleFocusScripts: focuses.map((one) => keys.of(one, where)),
    compatibleSignatureScripts: signatures.map((one) => one.scriptId),
    compatibleAffixScripts: affixes.map((one) => one.scriptId),
    signatureScripts: Object.fromEntries(signatures.map((one) => [one.scriptId, one])),
    affixScripts: Object.fromEntries(affixes.map((one) => [one.scriptId, one])),
  } as GrimoireTemplate
}

const LINE_FIELDS: readonly string[] = [
  "slug",
  "key",
  "title",
  "displayOrder",
  "esoSkillLineId",
  "maxRank",
  "category",
  "class",
  "hashPlace",
]

function lineOf(row: Value, keys: SkillKeys): SkillLineTemplate {
  const where = `the skill line page \`${String(row.slug)}\``
  return {
    id: String(row.key),
    name: String(row.title),
    subcategoryId: keys.of(row.category, where),
    ...(row.class === undefined || row.class === null ? {} : { class: keys.of(row.class, where) }),
    displayOrder: Number(row.displayOrder),
    esoSkillLineId: Number(row.esoSkillLineId),
    maxRank: Number(row.maxRank),
  } as SkillLineTemplate
}

const RACE_FIELDS: readonly string[] = ["slug", "key", "title", "altName", "esoRaceId", "hashPlace"]

export type RaceTemplate = {
  readonly id: string
  readonly name: string
  readonly altName: string
  readonly esoRaceId: number
}

function raceOf(row: Value): RaceTemplate {
  return {
    id: String(row.key),
    name: String(row.title),
    altName: typeof row.altName === "string" ? row.altName : "",
    esoRaceId: Number(row.esoRaceId),
  }
}

const CLASS_FIELDS: readonly string[] = ["slug", "key", "title", "icon", "esoClassId", "hashPlace"]

export type ClassTemplate = {
  readonly id: string
  readonly name: string
  readonly icon: string
  readonly esoClassId: number
}

function classOf(row: Value): ClassTemplate {
  return {
    id: String(row.key),
    name: String(row.title),
    icon: typeof row.icon === "string" ? row.icon : "",
    esoClassId: Number(row.esoClassId),
  }
}

export type CatalogTemplates = SkillTemplates & {
  readonly races: readonly RaceTemplate[]
  readonly classes: readonly ClassTemplate[]
  readonly skillLines: readonly SkillLineTemplate[]
  readonly focusScripts: readonly ScriptTemplate[]
  readonly signatureScripts: readonly ScriptTemplate[]
  readonly affixScripts: readonly ScriptTemplate[]
  readonly grimoires: readonly GrimoireTemplate[]
}

type Read = readonly [string, readonly string[]]

function readsOf(asked: readonly Read[]): readonly Read[] {
  const fields = new Map<string, Set<string>>()
  for (const [pageTypeSlug, wanted] of asked) {
    const held = fields.get(pageTypeSlug) ?? new Set<string>()
    for (const one of wanted) held.add(one)
    fields.set(pageTypeSlug, held)
  }
  return [...fields].map(([pageTypeSlug, wanted]) => [pageTypeSlug, [...wanted]] as const)
}

export const CATALOG_READS: readonly Read[] = readsOf([
  [temperSkill.slug, SKILL_FIELDS],
  [temperScribedSkill.slug, SCRIBED_SKILL_FIELDS],
  [temperFocusScript.slug, SCRIPT_FIELDS],
  [temperSignatureScript.slug, SCRIPT_FIELDS],
  [temperAffixScript.slug, SCRIPT_FIELDS],
  [temperGrimoire.slug, GRIMOIRE_FIELDS],
  [temperSkillLine.slug, LINE_FIELDS],
  [temperRace.slug, RACE_FIELDS],
  [temperClass.slug, CLASS_FIELDS],
  [temperSkillBar.slug, ["slug", "title", "displayOrder"]],
  ...COMPLETION_PAGE_READS,
  ...SKILL_KEYED_BY.map(([pageTypeSlug, field]): Read => [pageTypeSlug, ["slug", field]]),
  ...CHARACTER_SOURCE_READS,
  ...GEAR_READS,
])

export function catalogTemplatesOf(
  rowsOf: (pageTypeSlug: string) => Iterable<Value>
): CatalogTemplates {
  holdCharacterSources(rowsOf)
  holdSkillBars(skillBarsOf(rowsOf(temperSkillBar.slug)))
  holdGear(rowsOf)
  holdCompletionPages(rowsOf)
  const keys = skillKeysIn(rowsOf)
  return {
    ...skillTemplatesOf(rowsOf(temperSkill.slug), rowsOf(temperScribedSkill.slug), keys),
    focusScripts: scriptTemplatesOf(rowsOf(temperFocusScript.slug)),
    signatureScripts: scriptTemplatesOf(rowsOf(temperSignatureScript.slug)),
    affixScripts: scriptTemplatesOf(rowsOf(temperAffixScript.slug)),
    grimoires: inPlace(rowsOf(temperGrimoire.slug)).map((row) => grimoireOf(row, keys)),
    skillLines: inPlace(rowsOf(temperSkillLine.slug)).map((row) => lineOf(row, keys)),
    races: inPlace(rowsOf(temperRace.slug)).map(raceOf),
    classes: inPlace(rowsOf(temperClass.slug)).map(classOf),
  }
}
