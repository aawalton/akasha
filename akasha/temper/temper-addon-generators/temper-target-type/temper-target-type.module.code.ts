import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const TARGET_TYPE_EAV_SCHEMA = z
  .object({
    key: z.string(),
  })
  .strict()

interface ParsedTargetType {
  key: string
  name: string
}

function parseTargetType(row: Page): ParsedTargetType {
  if (row.title === null) {
    throw new Error(`temper-target-type row ${row.id} has null title`)
  }
  const eav = TARGET_TYPE_EAV_SCHEMA.parse({
    key: row.key,
  })
  return {
    key: eav.key,
    name: row.title,
  }
}

export function generateTemperTargetType(rows: readonly Page[]): string {
  const parsed = rows.map(parseTargetType)

  const precedence: Record<string, number> = {
    self: 0,
    enemy: 1,
    ally: 2,
    "self-and-ally": 3,
    "self-or-ally": 4,
    "lowest-health-ally": 5,
    ground: 6,
  }
  const sorted = [...parsed].sort((a, b) => {
    const pa = precedence[a.key] ?? 1_000
    const pb = precedence[b.key] ?? 1_000
    if (pa !== pb) return pa - pb
    return a.key.localeCompare(b.key)
  })

  const entries = sorted.map(
    (s) =>
      `  ${JSON.stringify(s.key)}: { id: ${JSON.stringify(s.key)}, name: ${JSON.stringify(s.name)} },`
  )

  return `\
/**
 * Temper Target Types (Generated)
 *
 * Seven target-type kinds — self, enemy, ally, self-and-ally,
 * self-or-ally, lowest-health-ally, ground — sourced from the universal
 * pages table (page type: temper-target-type).
 *
 * Each entry's \`id\` is the stable codec-facing identifier and the same
 * string is used as the record key, so
 * \`TEMPER_TARGET_TYPES["self"]\` is well-typed and feeds the
 * \`targetTypes\` lookup in @temper/game-characters-skills.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { TargetTypeTemplate } from "../target-type-data"

export const TEMPER_TARGET_TYPES = {
${entries.join("\n")}
} as const satisfies Record<string, TargetTypeTemplate>
`
}
