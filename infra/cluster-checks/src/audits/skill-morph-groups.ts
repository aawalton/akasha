import { OperationalError } from "@shared/errors-core/exit"
import { askComposed } from "@shared/pages-query/ask"
import { z } from "zod"
import { type AuditReading, summarizeAudit } from "../lib/audit-reading"
import {
  type BaseLessMorphGroupViolation,
  countMorphGroups,
  findBaseLessMorphGroups,
  type SkillCatalogRow,
} from "../lib/skill-morph-groups"

const PAGE_TYPE_SLUG = "temper-skill"

const PROP_ID = "id"
const PROP_TITLE = "title"
const PROP_KEY = "key"
const PROP_BASE_NAME = "base-name"
const PROP_SKILL_LINE_ID = "skill-line-id"
const PROP_SKILL_TYPE = "skill-type"
const PROP_ESO_SKILL_ID = "eso-skill-id"
const PROP_MORPH_INDEX = "morph-index"
const PROP_SUBCATEGORY_ID = "subcategory-id"

const SKILL_KEYS: readonly string[] = [
  PROP_ID,
  PROP_TITLE,
  PROP_KEY,
  PROP_BASE_NAME,
  PROP_SKILL_LINE_ID,
  PROP_SKILL_TYPE,
  PROP_ESO_SKILL_ID,
  PROP_MORPH_INDEX,
  PROP_SUBCATEGORY_ID,
]

const STRING_OR_UNDEFINED_SCHEMA = z.string().optional()

function asString(value: unknown, fallback: string): string {
  const parsed = STRING_OR_UNDEFINED_SCHEMA.safeParse(value)
  return parsed.success && parsed.data !== undefined ? parsed.data : fallback
}

function asNumber(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value
  if (typeof value === "string" && value.length > 0) {
    const n = Number(value)
    return Number.isFinite(n) ? n : 0
  }
  return 0
}

interface SkillMorphGroupsAudit {
  readonly reading: AuditReading
  readonly violations: readonly BaseLessMorphGroupViolation[]
  readonly observedAtMs: number
}

type ReadSkillRows = () => Promise<readonly Record<string, unknown>[]>

const readRows: ReadSkillRows = async () => {
  const asked = await askComposed({ "page-type": PAGE_TYPE_SLUG, keys: SKILL_KEYS })
  if (!asked.ok) {
    throw new OperationalError(`asking for every ${PAGE_TYPE_SLUG} page — ${asked.why}`)
  }
  if (asked.answer.unfound.length > 0) {
    throw new OperationalError(
      `no ${PAGE_TYPE_SLUG} page carries ${asked.answer.unfound.join(", ")} — every skill would read as missing that field, and the audit would find morph groups that are not there`
    )
  }
  return asked.answer.rows.map((row) => row.values)
}

export function foldSkillRows(
  rows: readonly Record<string, unknown>[]
): readonly SkillCatalogRow[] {
  return rows.map((row): SkillCatalogRow => {
    return {
      key: asString(row[PROP_KEY], asString(row[PROP_ID], "<unknown-key>")),
      name: asString(row[PROP_TITLE], "<untitled>"),
      baseName: asString(row[PROP_BASE_NAME], ""),
      skillLineId: asString(row[PROP_SKILL_LINE_ID], ""),
      skillType: asString(row[PROP_SKILL_TYPE], ""),
      esoSkillId: asNumber(row[PROP_ESO_SKILL_ID]),
      morphIndex: asNumber(row[PROP_MORPH_INDEX]),
      subcategoryId: asString(row[PROP_SUBCATEGORY_ID], ""),
    }
  })
}

export async function gatherSkillMorphGroups(
  nowMs: number,
  read: ReadSkillRows = readRows
): Promise<SkillMorphGroupsAudit> {
  let rawRows: readonly Record<string, unknown>[]
  try {
    rawRows = await read()
  } catch (error) {
    throw new OperationalError(
      `could not read ${PAGE_TYPE_SLUG} rows — ${error instanceof Error ? error.message : String(error)}`
    )
  }

  const rows = foldSkillRows(rawRows)
  const violations = findBaseLessMorphGroups(rows)
  return {
    reading: summarizeAudit({
      scanned: rows.length,
      compared: countMorphGroups(rows),
      findings: violations.length,
      coverage: "complete",
    }),
    violations,
    observedAtMs: nowMs,
  }
}
