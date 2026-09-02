import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const ROTATION_BREAKDOWN_ROW_EAV_SCHEMA = z
  .object({
    key: z.string().min(1),
    fullName: z.string().min(1),
    description: z.string().min(1),
  })
  .strict()

interface ParsedRotationBreakdownRow {
  key: string
  name: string
  fullName: string
  description: string
}

function parseRotationBreakdownRow(row: Page): ParsedRotationBreakdownRow {
  if (row.title === null) {
    throw new Error(`temper-rotation-breakdown-row row ${row.id} has null title`)
  }
  const eav = ROTATION_BREAKDOWN_ROW_EAV_SCHEMA.parse({
    key: row.key,
    fullName: row.fullName,
    description: row.description,
  })
  return {
    key: eav.key,
    name: row.title,
    fullName: eav.fullName,
    description: eav.description,
  }
}

export function generateTemperRotationBreakdownRow(rows: readonly Page[]): string {
  const parsed = rows.map(parseRotationBreakdownRow)

  const precedence: Record<string, number> = {
    damage: 0,
    "d-percent": 1,
    dps: 2,
    dpc: 3,
    healing: 4,
    "h-percent": 5,
    sps: 6,
    spc: 7,
    hps: 8,
    hpc: 9,
    casts: 10,
    uptime: 11,
    tps: 12,
  }
  const sorted = [...parsed].sort((a, b) => {
    const pa = precedence[a.key] ?? 1_000
    const pb = precedence[b.key] ?? 1_000
    if (pa !== pb) return pa - pb
    return a.key.localeCompare(b.key)
  })

  const entries = sorted.map(
    (r) =>
      `  ${JSON.stringify(r.key)}: { id: ${JSON.stringify(r.key)}, name: ${JSON.stringify(r.name)}, fullName: ${JSON.stringify(r.fullName)}, description: ${JSON.stringify(r.description)} },`
  )

  return `\
/**
 * Temper Rotation Breakdown Rows (Generated)
 *
 * The 13 companion-rotation breakdown table metric labels (damage,
 * d-percent, dps, dpc, healing, h-percent, sps, spc, hps, hpc, casts,
 * uptime, tps) sourced from the universal pages table (page type:
 * temper-rotation-breakdown-row).
 *
 * Each entry's \`id\` is the stable codec-facing identifier and the same
 * string is used as the record key, so
 * \`TEMPER_ROTATION_BREAKDOWN_ROWS["damage"]\` is well-typed and feeds the
 * \`rotationBreakdownRows\` lookup in @temper/game-companions-core.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { RotationBreakdownRowTemplate } from "../rotation-breakdown-row-data"

export const TEMPER_ROTATION_BREAKDOWN_ROWS = {
${entries.join("\n")}
} as const satisfies Record<string, RotationBreakdownRowTemplate>
`
}
