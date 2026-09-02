import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const TARGET_ARMOR_EAV_SCHEMA = z
  .object({
    key: z.string(),
    armor: z.number().int().nonnegative(),
  })
  .strict()

interface ParsedTargetArmor {
  key: string
  name: string
  armor: number
}

function parseTargetArmor(row: Page): ParsedTargetArmor {
  if (row.title === null) {
    throw new Error(`temper-target-armor row ${row.id} has null title`)
  }
  const eav = TARGET_ARMOR_EAV_SCHEMA.parse({
    key: row.key,
    armor: row.armor,
  })
  return {
    key: eav.key,
    name: row.title,
    armor: eav.armor,
  }
}

export function generateTemperTargetArmor(rows: readonly Page[]): string {
  const parsed = rows.map(parseTargetArmor)

  const sorted = [...parsed].sort((a, b) => a.key.localeCompare(b.key))

  const entries = sorted.map((t) => {
    return `  ${JSON.stringify(t.key)}: { id: ${JSON.stringify(t.key)}, name: ${JSON.stringify(t.name)}, armor: ${t.armor} },`
  })

  return `\
/**
 * Temper Target Armor (Generated)
 *
 * ESO target-armor values for solo build calculations, sourced from the
 * universal pages table (page type: temper-target-armor).
 *
 * Each entry's \`id\` is the stable codec-facing identifier
 * ("overland" / "dungeon") and the same string is used as the record
 * key, so \`TEMPER_TARGET_ARMORS["dungeon"]\` is well-typed and feeds the
 * \`TargetArmorId\` union and the \`targetArmor.data\` lookup in
 * @temper/game-characters-character.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { TargetArmorTemplate } from "../target-armor-data"

export const TEMPER_TARGET_ARMORS = {
${entries.join("\n")}
} as const satisfies Record<string, TargetArmorTemplate>
`
}
