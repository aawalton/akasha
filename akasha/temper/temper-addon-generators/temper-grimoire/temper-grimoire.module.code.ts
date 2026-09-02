import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const SIGNATURE_VARIANT_SCHEMA = z
  .object({
    scriptId: z.string().min(1),
    description: z.string(),
    classId: z.string().optional(),
  })
  .strict()

const AFFIX_VARIANT_SCHEMA = z
  .object({
    scriptId: z.string().min(1),
    description: z.string(),
  })
  .strict()

const GRIMOIRE_EAV_SCHEMA = z
  .object({
    key: z.string().min(1),
    abilityIcon: z.string(),
    skillLineId: z.string().min(1),
    itemId: z.number().int().nonnegative(),
    uespId: z.number().int().nonnegative(),
    compatibleFocusScripts: z.array(z.string()).readonly(),
    compatibleSignatureScripts: z.array(z.string()).readonly(),
    compatibleAffixScripts: z.array(z.string()).readonly(),
    signatureScripts: z.record(z.string(), SIGNATURE_VARIANT_SCHEMA),
    affixScripts: z.record(z.string(), AFFIX_VARIANT_SCHEMA),
  })
  .strict()

type ParsedSignatureVariant = z.infer<typeof SIGNATURE_VARIANT_SCHEMA>
type ParsedAffixVariant = z.infer<typeof AFFIX_VARIANT_SCHEMA>

interface ParsedGrimoire {
  key: string
  name: string
  icon: string
  abilityIcon: string
  skillLineId: string
  itemId: number
  uespId: number
  compatibleFocusScripts: readonly string[]
  compatibleSignatureScripts: readonly string[]
  compatibleAffixScripts: readonly string[]
  signatureScripts: { [scriptId: string]: ParsedSignatureVariant }
  affixScripts: { [scriptId: string]: ParsedAffixVariant }
}

function parseGrimoire(row: Page): ParsedGrimoire {
  if (row.title === null) {
    throw new Error(`temper-grimoire row ${row.id} has null title`)
  }
  const eav = GRIMOIRE_EAV_SCHEMA.parse({
    key: row.key,
    abilityIcon: row.abilityIcon,
    skillLineId: row.skillLineId,
    itemId: row.itemId,
    uespId: row.uespId,
    compatibleFocusScripts: row.compatibleFocusScripts,
    compatibleSignatureScripts: row.compatibleSignatureScripts,
    compatibleAffixScripts: row.compatibleAffixScripts,
    signatureScripts: row.signatureScripts,
    affixScripts: row.affixScripts,
  })
  const icon = typeof row.icon === "string" ? row.icon : ""
  return {
    key: eav.key,
    name: row.title,
    icon,
    abilityIcon: eav.abilityIcon,
    skillLineId: eav.skillLineId,
    itemId: eav.itemId,
    uespId: eav.uespId,
    compatibleFocusScripts: eav.compatibleFocusScripts,
    compatibleSignatureScripts: eav.compatibleSignatureScripts,
    compatibleAffixScripts: eav.compatibleAffixScripts,
    signatureScripts: eav.signatureScripts,
    affixScripts: eav.affixScripts,
  }
}

function renderStringArray(arr: readonly string[]): string {
  if (arr.length === 0) return "[]"
  return `[${arr.map((s) => JSON.stringify(s)).join(", ")}]`
}

function renderSignatureVariant(v: ParsedSignatureVariant): string {
  const parts = [
    `scriptId: ${JSON.stringify(v.scriptId)}`,
    `description: ${JSON.stringify(v.description)}`,
  ]
  if (v.classId !== undefined) {
    parts.push(`classId: ${JSON.stringify(v.classId)}`)
  }
  return `{ ${parts.join(", ")} }`
}

function renderAffixVariant(v: ParsedAffixVariant): string {
  return `{ scriptId: ${JSON.stringify(v.scriptId)}, description: ${JSON.stringify(v.description)} }`
}

function renderVariantMap<V>(map: { [scriptId: string]: V }, render: (v: V) => string): string {
  const keys = Object.keys(map).sort()
  if (keys.length === 0) return "{}"
  const entries = keys.map((k) => {
    const v = map[k]
    if (v === undefined) {
      throw new Error(`variant map missing entry for key ${JSON.stringify(k)}`)
    }
    return `      ${JSON.stringify(k)}: ${render(v)},`
  })
  return `{\n${entries.join("\n")}\n    }`
}

function renderGrimoire(g: ParsedGrimoire): string {
  const idLit = JSON.stringify(g.key)
  return `  ${idLit}: {
    id: ${idLit},
    name: ${JSON.stringify(g.name)},
    icon: ${JSON.stringify(g.icon)},
    abilityIcon: ${JSON.stringify(g.abilityIcon)},
    skillLineId: ${JSON.stringify(g.skillLineId)},
    itemId: ${g.itemId},
    uespId: ${g.uespId},
    compatibleFocusScripts: ${renderStringArray(g.compatibleFocusScripts)},
    compatibleSignatureScripts: ${renderStringArray(g.compatibleSignatureScripts)},
    compatibleAffixScripts: ${renderStringArray(g.compatibleAffixScripts)},
    signatureScripts: ${renderVariantMap(g.signatureScripts, renderSignatureVariant)},
    affixScripts: ${renderVariantMap(g.affixScripts, renderAffixVariant)},
  },`
}

export function generateTemperGrimoire(rows: readonly Page[]): string {
  const parsed = rows.map(parseGrimoire)

  const sorted = [...parsed].sort((a, b) => a.uespId - b.uespId)

  const lines = sorted.map(renderGrimoire)

  return `\
/**
 * Temper Grimoires (Generated)
 *
 * ESO scribing grimoires (the base ability that defines which focus,
 * signature, and affix scripts can be combined to create a scribed
 * skill), sourced from the universal pages table
 * (page type: temper-grimoire).
 *
 * Each entry's \`id\` is the stable codec-facing identifier
 * (e.g. "vault") and the same string is used as the record key, so
 * \`TEMPER_GRIMOIRES["vault"]\` is well-typed and feeds the
 * \`GrimoireId\` union and the \`grimoires.data\` lookup in
 * @temper/game-characters-skills/scribing.
 *
 * The per-grimoire \`signatureScripts\` and \`affixScripts\` maps carry
 * grimoire-specific variant descriptions (and optional \`classId\` for
 * class-restricted signature variants); the \`compatibleXxxScripts\`
 * arrays are the projections used by the build-state UI to filter the
 * script picker.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { GrimoireTemplate } from "../scribing/grimoires-data"

export const TEMPER_GRIMOIRES = {
${lines.join("\n")}
} as const satisfies Record<string, GrimoireTemplate>
`
}
