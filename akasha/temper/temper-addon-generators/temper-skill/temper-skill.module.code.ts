import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const SKILL_EAV_SCHEMA = z
  .object({
    key: z.string().min(1),
    esoSkillId: z.number().int().nonnegative(),
    baseName: z.string().min(1),
    skillLineId: z.string().min(1),
    skillType: z.string().min(1),
    description: z.string(),
    icon: z.string().min(1).nullable(),
    isMorph: z.boolean(),
    morphIndex: z.number().int().nonnegative(),
    lineRankNeeded: z.number().int().nonnegative(),
    rank: z.number().int().nonnegative(),
    subcategoryId: z.string().min(1),
    effects: z.array(z.unknown()).optional(),
    status: z.string().min(1).optional(),
  })
  .strict()

interface ParsedSkill {
  key: string
  name: string
  esoSkillId: number
  baseName: string
  skillLineId: string
  skillType: string
  description: string
  icon: string | null
  isMorph: boolean
  morphIndex: number
  lineRankNeeded: number
  rank: number
  subcategoryId: string
  effects: readonly unknown[] | undefined
  status: string | undefined
}

function parseSkill(row: Page): ParsedSkill {
  if (row.title === null) {
    throw new Error(`temper-skill row ${row.id} has null title`)
  }
  const eav = SKILL_EAV_SCHEMA.parse({
    key: row.key,
    esoSkillId: row.esoSkillId,
    baseName: row.baseName,
    skillLineId: row.skillLineId,
    skillType: row.skillType,
    description: row.description,
    icon: row.icon ?? null,
    isMorph: row.isMorph,
    morphIndex: row.morphIndex,
    lineRankNeeded: row.lineRankNeeded,
    rank: row.rank,
    subcategoryId: row.subcategoryId,
    effects: row.effects,
    status: row.status,
  })
  return {
    key: eav.key,
    name: row.title,
    esoSkillId: eav.esoSkillId,
    baseName: eav.baseName,
    skillLineId: eav.skillLineId,
    skillType: eav.skillType,
    description: eav.description,
    icon: eav.icon,
    isMorph: eav.isMorph,
    morphIndex: eav.morphIndex,
    lineRankNeeded: eav.lineRankNeeded,
    rank: eav.rank,
    subcategoryId: eav.subcategoryId,
    effects: eav.effects,
    status: eav.status,
  }
}

export function generateTemperSkill(rows: readonly Page[]): string {
  const parsed = rows.map(parseSkill)

  const sorted = [...parsed].sort((a, b) =>
    a.key === "no-skill" ? -1 : b.key === "no-skill" ? 1 : a.key.localeCompare(b.key)
  )

  const entryLines = sorted.map((r) => {
    const keyLiteral = JSON.stringify(r.key)
    const fields: string[] = []
    fields.push(`    id: ${keyLiteral} as const`)
    fields.push(`    esoSkillId: ${r.esoSkillId}`)
    fields.push(`    name: ${JSON.stringify(r.name)}`)
    fields.push(`    baseName: ${JSON.stringify(r.baseName)}`)
    fields.push(`    skillLineId: ${JSON.stringify(r.skillLineId)} as const`)
    fields.push(`    skillType: ${JSON.stringify(r.skillType)} as const`)
    fields.push(`    description: ${JSON.stringify(r.description)}`)
    fields.push(`    icon: ${r.icon === null ? "null" : JSON.stringify(r.icon)}`)
    fields.push(`    isMorph: ${r.isMorph}`)
    fields.push(`    morphIndex: ${r.morphIndex}`)
    fields.push(`    lineRankNeeded: ${r.lineRankNeeded}`)
    fields.push(`    rank: ${r.rank}`)
    fields.push(`    subcategoryId: ${JSON.stringify(r.subcategoryId)} as const`)
    if (r.effects !== undefined) {
      const effectsJson = JSON.stringify(r.effects).replace(
        /"seconds":null/g,
        '"seconds":Number.POSITIVE_INFINITY'
      )
      fields.push(`    effects: ${effectsJson} as const`)
    }
    if (r.status !== undefined) {
      fields.push(`    status: ${JSON.stringify(r.status)} as const`)
    }
    return `  ${keyLiteral}: {
${fields.join(",\n")},
  },`
  })

  return `\
/**
 * Temper Skills (Generated)
 *
 * All ESO skills sourced from the universal pages table (page type:
 * temper-skill). At parent #9967 bootstrap (#11351), only the
 * no-skill sentinel lives here; the 6 follow-on row-only child projects
 * append per-category rows as they cut over their respective
 * \`skill-lines/*-data.ts\` files.
 *
 * Optional fields (\`effects\`, \`status\`) are present only on rows
 * whose source declared them. The downstream presence-check semantics
 * in \`skills-data.ts\` continue to distinguish e.g. passive skills
 * with implemented effects from those without.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import { createDataFile, type DataFile } from "@akasha/utils-narrow/create-data-file"
import type { SkillLineId } from "@akasha/temper-skill-lines/skill-lines"
import type { SkillTemplate } from "../skills-data"

const SKILLS_DATA = {
${entryLines.join("\n")}
} satisfies Record<string, SkillTemplate>

// Explicit \`DataFile<string, SkillTemplate, SkillLineId | "scribed" | "none">\`
// annotation avoids TS error 7056 ("The inferred type of this node exceeds
// the maximum length the compiler will serialize"). Without it, TS tries to
// serialize the literal union of ~1700 \`SKILLS_DATA\` keys into the inferred
// return type and bails out; widening the key parameter to \`string\` keeps
// the consumer surface (\`ids\`, \`data\`, \`list\`, \`has\`, \`subcategories\`)
// usable while breaking the serializer budget.
export const skillsFromPages: DataFile<string, SkillTemplate, SkillLineId | "scribed" | "none"> =
  createDataFile<SkillTemplate>()(SKILLS_DATA)
`
}
