import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const SKILL_SCALING_STAT = z.enum([
  "weapon-power",
  "max-health",
  "higher-resource",
  "max-magicka",
  "max-stamina",
])

const SKILL_VALUE_FORMULA_SCHEMA = z.discriminatedUnion("type", [
  z
    .object({
      type: z.literal("stat-scaling"),
      stat: SKILL_SCALING_STAT,
      coefficient: z.number(),
      scalingFactor: z.number().optional(),
    })
    .strict(),
  z
    .object({
      type: z.literal("stat-percent"),
      stat: SKILL_SCALING_STAT,
      percent: z.number(),
    })
    .strict(),
  z
    .object({
      type: z.literal("fixed"),
      value: z.number(),
    })
    .strict(),
])

const DAMAGE_TYPE = z.enum([
  "physical",
  "magic",
  "flame",
  "frost",
  "shock",
  "poison",
  "disease",
  "bleed",
  "oblivion",
])

const ACTIVATION_EFFECT_SCHEMA = z
  .object({
    effectType: z.enum(["damage", "heal", "shield"]),
    damageType: DAMAGE_TYPE.optional(),
    formula: SKILL_VALUE_FORMULA_SCHEMA,
  })
  .strict()

const ACTIVATION_EAV_SCHEMA = z
  .object({
    skillKey: z.string().min(1),
    descriptionTemplate: z.string(),
    effects: z.array(ACTIVATION_EFFECT_SCHEMA),
  })
  .strict()

interface ParsedActivation {
  skillKey: string
  descriptionTemplate: string
  effects: readonly z.infer<typeof ACTIVATION_EFFECT_SCHEMA>[]
}

function parseActivation(row: Page): ParsedActivation {
  const eav = ACTIVATION_EAV_SCHEMA.parse({
    skillKey: row.skillKey,
    descriptionTemplate: row.descriptionTemplate,
    effects: row.effects,
  })
  return {
    skillKey: eav.skillKey,
    descriptionTemplate: eav.descriptionTemplate,
    effects: eav.effects,
  }
}

export function generateTemperCharacterSkillActivation(rows: readonly Page[]): string {
  const parsed = rows.map(parseActivation)

  const sorted = [...parsed].sort((a, b) => a.skillKey.localeCompare(b.skillKey))

  const entries = sorted.map((r) => {
    const keyLiteral = JSON.stringify(r.skillKey)
    const effectsJson = JSON.stringify(r.effects)
    return `  ${keyLiteral}: {
    descriptionTemplate: ${JSON.stringify(r.descriptionTemplate)},
    effects: ${effectsJson},
  },`
  })

  return `\
/**
 * Temper Character Skill Activation (Generated)
 *
 * Per-skill description templates + formula effects for player tooltip
 * validation, sourced from the universal pages table (page type:
 * temper-character-skill-activation).
 *
 * Each entry's key matches the corresponding \`temper-skill\` row's
 * \`key\` (e.g. "vampires-bane") — the validator routes from \`SkillId\`
 * directly into this record.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { CharacterActivationEffect } from "../character-skill-activation-data"
import type { SkillId } from "../skills-data"

interface CharacterSkillActivationData {
  readonly descriptionTemplate: string
  readonly effects: readonly CharacterActivationEffect[]
}

export const TEMPER_CHARACTER_SKILL_ACTIVATIONS = {
${entries.join("\n")}
} as const satisfies Partial<Record<SkillId, CharacterSkillActivationData>>
`
}
