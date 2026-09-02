import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const COMPANION_WEAPON_ROLE_EAV_SCHEMA = z
  .object({
    key: z.string().min(1),
    weaponSkillLineId: z.string().min(1),
    validMainHandWeaponTypes: z.array(z.string().min(1)).default([]),
    validOffHandWeaponTypes: z.array(z.string().min(1)).default([]),
  })
  .strict()

interface ParsedCompanionWeaponRole {
  key: string
  name: string
  weaponSkillLineId: string
  validMainHandWeaponTypes: readonly string[]
  validOffHandWeaponTypes: readonly string[]
}

function parseCompanionWeaponRole(row: Page): ParsedCompanionWeaponRole {
  if (row.title === null) {
    throw new Error(`temper-companion-weapon-role row ${row.id} has null title`)
  }
  const eav = COMPANION_WEAPON_ROLE_EAV_SCHEMA.parse({
    key: row.key,
    weaponSkillLineId: row.weaponSkillLineId,
    validMainHandWeaponTypes: row.validMainHandWeaponTypes,
    validOffHandWeaponTypes: row.validOffHandWeaponTypes,
  })
  return {
    key: eav.key,
    name: row.title,
    weaponSkillLineId: eav.weaponSkillLineId,
    validMainHandWeaponTypes: eav.validMainHandWeaponTypes,
    validOffHandWeaponTypes: eav.validOffHandWeaponTypes,
  }
}

export function generateTemperCompanionWeaponRole(rows: readonly Page[]): string {
  const parsed = rows.map(parseCompanionWeaponRole)

  const precedence: Record<string, number> = {
    "no-weapon-role": 0,
    "dual-wield": 1,
    "two-handed": 2,
    "one-hand-and-shield": 3,
    bow: 4,
    "restoration-staff": 5,
    "inferno-staff": 6,
    "ice-staff": 7,
    "lightning-staff": 8,
  }
  const sorted = [...parsed].sort((a, b) => {
    const pa = precedence[a.key] ?? 1_000
    const pb = precedence[b.key] ?? 1_000
    if (pa !== pb) return pa - pb
    return a.key.localeCompare(b.key)
  })

  const entries = sorted.map((r) => {
    const mainHand = `[${r.validMainHandWeaponTypes.map((s) => JSON.stringify(s)).join(", ")}] as const`
    const offHand = `[${r.validOffHandWeaponTypes.map((s) => JSON.stringify(s)).join(", ")}] as const`
    return `  ${JSON.stringify(r.key)}: { id: ${JSON.stringify(r.key)} as const, name: ${JSON.stringify(r.name)}, weaponSkillLineId: ${JSON.stringify(r.weaponSkillLineId)}, validMainHandWeaponTypes: ${mainHand}, validOffHandWeaponTypes: ${offHand} },`
  })

  return `\
/**
 * Temper Companion Weapon Roles (Generated)
 *
 * Higher-level weapon role abstraction for the optimizer -- 8 real
 * roles (dual-wield, two-handed, one-hand-and-shield, bow,
 * restoration-staff, inferno-staff, ice-staff, lightning-staff) plus
 * the \`no-weapon-role\` sentinel that represents an unassigned weapon
 * role during phased optimization. Sourced from the universal pages
 * table (page type: temper-companion-weapon-role).
 *
 * Each entry's \`id\` is the stable codec-facing identifier and the
 * same string is used as the record key, so
 * \`TEMPER_COMPANION_WEAPON_ROLES["dual-wield"]\` is well-typed and
 * feeds the \`companionWeaponRoles\` lookup in @temper/game-companions-core.
 *
 * DO NOT EDIT -- regenerate with: ops temper addon-data generate
 */

import type { CompanionWeaponRoleTemplate } from "@akasha/temper-companions-core/companion-weapon-roles"

export const TEMPER_COMPANION_WEAPON_ROLES = {
${entries.join("\n")}
} as const satisfies Record<string, CompanionWeaponRoleTemplate>
`
}
