import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const SCRIBED_SKILL_EAV_SCHEMA = z
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
    grimoireId: z.string().min(1),
    focusScriptId: z.string().min(1),
    classId: z.string().min(1).optional(),
    effects: z.array(z.unknown()).optional(),
    status: z.string().min(1).optional(),
  })
  .strict()

interface ParsedScribedSkill {
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
  grimoireId: string
  focusScriptId: string
  classId: string | undefined
  effects: readonly unknown[] | undefined
  status: string | undefined
}

function parseScribedSkill(row: Page): ParsedScribedSkill {
  if (row.title === null) {
    throw new Error(`temper-scribed-skill row ${row.id} has null title`)
  }
  const eav = SCRIBED_SKILL_EAV_SCHEMA.parse({
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
    grimoireId: row.grimoireId,
    focusScriptId: row.focusScriptId,
    classId: row.classId,
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
    grimoireId: eav.grimoireId,
    focusScriptId: eav.focusScriptId,
    classId: eav.classId,
    effects: eav.effects,
    status: eav.status,
  }
}

export function generateTemperScribedSkill(rows: readonly Page[]): string {
  const parsed = rows.map(parseScribedSkill)

  const sorted = [...parsed].sort((a, b) => a.key.localeCompare(b.key))

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
    fields.push(`    grimoireId: ${JSON.stringify(r.grimoireId)} as const`)
    fields.push(`    focusScriptId: ${JSON.stringify(r.focusScriptId)} as const`)
    if (r.classId !== undefined) {
      fields.push(`    classId: ${JSON.stringify(r.classId)} as const`)
    }
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
 * Temper Scribed Skills (Generated)
 *
 * All ESO scribed skills (grimoire + focus-script combinations) sourced
 * from the universal pages table (page type: temper-scribed-skill).
 *
 * Each entry's \`id\` is the stable codec-facing identifier
 * (e.g. "scribed-vault-physical-damage") and the same string is used as
 * the record key, so \`TEMPER_SCRIBED_SKILLS["scribed-vault-physical-damage"]\`
 * is well-typed and feeds the \`ScribedSkillId\` union and the
 * \`scribedSkills.data\` lookup in @temper/game-characters-skills/scribing.
 *
 * Emitted in alphabetical \`key\` order; the codec emits scribed skills
 * in \`scribedSkills.ids\` order (see
 * \`temper/game-codec/src/character/build-codec-indices.ts\`). The
 * legacy source file was already alphabetical, so existing build hashes
 * round-trip unchanged through this snapshot.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { ScribedSkillTemplate } from "../scribing/scribed-skills-data"

export const TEMPER_SCRIBED_SKILLS = {
${entryLines.join("\n")}
} as const satisfies Record<string, ScribedSkillTemplate>
`
}
