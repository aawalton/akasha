import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { temperBuffMajor } from "akasha/temper/catalog/effect/temper-buff-major/temper-buff-major.page-type.ts"
import { temperBuffMinor } from "akasha/temper/catalog/effect/temper-buff-minor/temper-buff-minor.page-type.ts"
import { temperBuffOther } from "akasha/temper/catalog/effect/temper-buff-other/temper-buff-other.page-type.ts"
import { temperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.ts"
import { temperFocusScript } from "akasha/temper/catalog/skill/temper-focus-script/temper-focus-script.page-type.ts"
import { temperGrimoire } from "akasha/temper/catalog/skill/temper-grimoire/temper-grimoire.page-type.ts"
import { temperSkillType } from "akasha/temper/catalog/skill/type/temper-skill-type.page-type.ts"
import type { SkillTemplate } from "akasha/temper/player/character/skill/modules/character-skill-template/character-skill-template.module.code.ts"
import type { ScribedSkillTemplate } from "akasha/temper/player/character/skill/modules/scribed-skill-template/scribed-skill-template.module.code.ts"
import { temperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.ts"

export const SKILL_KEYED_BY: readonly (readonly [string, string])[] = [
  [temperSkillLine.slug, "key"],
  [temperSkillType.slug, "key"],
  [temperGrimoire.slug, "key"],
  [temperFocusScript.slug, "key"],
  [temperBuffMajor.slug, "key"],
  [temperBuffMinor.slug, "key"],
  [temperBuffOther.slug, "key"],
  [temperMetricTree.slug, "nodeId"],
]

export const SKILL_FIELDS: readonly string[] = [
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

export const SCRIBED_SKILL_FIELDS: readonly string[] = [
  ...SKILL_FIELDS,
  "grimoireId",
  "focusScriptId",
]

const NO_SKILL = "no-skill"

const SCRIBED = "scribed"

const NONE = "none"

const RENAMED: Readonly<Record<string, string>> = { type: "effectType", value: "effectValue" }

const FOREVER = "seconds"

export class SkillUnkeyed extends Error {}

export type SkillKeys = {
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

export type SkillTemplates = {
  readonly skills: readonly SkillTemplate[]
  readonly scribedSkills: readonly ScribedSkillTemplate[]
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
