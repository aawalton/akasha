import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const COMPANION_BASE_ROLE_EAV_SCHEMA = z
  .object({
    key: z.string().min(1),
    abbreviation: z.string().min(1),
    description: z.string().min(1),
    validWeaponRoleIds: z.array(z.string().min(1)),
    validTraitIds: z.array(z.string().min(1)),
    validArmorWeights: z.array(z.string().min(1)),
    displayOrder: z.number().int().nonnegative(),
  })
  .strict()

interface ParsedCompanionBaseRole {
  key: string
  name: string
  abbreviation: string
  description: string
  validWeaponRoleIds: readonly string[]
  validTraitIds: readonly string[]
  validArmorWeights: readonly string[]
  displayOrder: number
}

function parseCompanionBaseRole(row: Page): ParsedCompanionBaseRole {
  if (row.title === null) {
    throw new Error(`temper-companion-base-role row ${row.id} has null title`)
  }
  const eav = COMPANION_BASE_ROLE_EAV_SCHEMA.parse({
    key: row.key,
    abbreviation: row.abbreviation,
    description: row.description,
    validWeaponRoleIds: row.validWeaponRoleIds,
    validTraitIds: row.validTraitIds,
    validArmorWeights: row.validArmorWeights,
    displayOrder: row.displayOrder,
  })
  return {
    key: eav.key,
    name: row.title,
    abbreviation: eav.abbreviation,
    description: eav.description,
    validWeaponRoleIds: eav.validWeaponRoleIds,
    validTraitIds: eav.validTraitIds,
    validArmorWeights: eav.validArmorWeights,
    displayOrder: eav.displayOrder,
  }
}

export function generateTemperCompanionBaseRole(rows: readonly Page[]): string {
  const parsed = rows.map(parseCompanionBaseRole)

  const sorted = [...parsed].sort((a, b) => a.displayOrder - b.displayOrder)

  const seen = new Set<number>()
  for (const r of sorted) {
    if (seen.has(r.displayOrder)) {
      throw new Error(
        `temper-companion-base-role ${r.key}: duplicate displayOrder ${r.displayOrder} (iteration order would be ambiguous)`
      )
    }
    seen.add(r.displayOrder)
  }

  const entryLines = sorted.map((r) => {
    const keyLiteral = JSON.stringify(r.key)
    const weapons = r.validWeaponRoleIds.map((s) => JSON.stringify(s)).join(", ")
    const traits = r.validTraitIds.map((s) => JSON.stringify(s)).join(", ")
    const weights = r.validArmorWeights.map((s) => JSON.stringify(s)).join(", ")
    return `  ${keyLiteral}: {
    id: ${keyLiteral} as const,
    name: ${JSON.stringify(r.name)},
    abbreviation: ${JSON.stringify(r.abbreviation)},
    description: ${JSON.stringify(r.description)},
    validWeaponRoleIds: [${weapons}] as readonly CompanionWeaponRoleId[],
    validTraitIds: [${traits}] as readonly CompanionTraitId[],
    validArmorWeights: [${weights}] as readonly CompanionArmorWeight[],
  },`
  })

  return `\
/**
 * Temper Companion Base Roles (Generated)
 *
 * The four companion base roles (dps, tank, healer, support) sourced
 * from the universal pages table (page type: temper-companion-base-role).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { CompanionArmorWeight } from "../companion-types"
import type { CompanionTraitId } from "@akasha/temper-companions-core/companion-traits"
import type { CompanionWeaponRoleId } from "@akasha/temper-companions-core/companion-weapon-roles"

interface CompanionBaseRoleTemplate {
  id: string
  name: string
  abbreviation: string
  description: string
  validWeaponRoleIds: readonly CompanionWeaponRoleId[]
  validTraitIds: readonly CompanionTraitId[]
  validArmorWeights: readonly CompanionArmorWeight[]
}

/**
 * Keyed record. The literal-id keys flow into \`createDataFile\`'s
 * \`companionBaseRoles.ids\` so \`(typeof companionBaseRoles.ids)[number]\`
 * stays literal-union typed for callers in \`companion-schema.ts\` and
 * elsewhere.
 */
export const TEMPER_COMPANION_BASE_ROLES_BY_ID = {
${entryLines.join("\n")}
} satisfies Record<string, CompanionBaseRoleTemplate>
`
}
