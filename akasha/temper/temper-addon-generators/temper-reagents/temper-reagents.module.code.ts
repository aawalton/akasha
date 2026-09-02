import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const REAGENT_EAV_SCHEMA = z
  .object({
    key: z.string().min(1),
    itemId: z.number().int().positive(),
    icon: z.string().min(1),
    effects: z.tuple([z.string().min(1), z.string().min(1), z.string().min(1), z.string().min(1)]),
  })
  .strict()

interface ParsedReagent {
  id: string
  name: string
  key: string
  itemId: number
  icon: string
  effects: readonly [string, string, string, string]
}

function parseReagent(row: Page): ParsedReagent {
  if (row.title === null) {
    throw new Error(`temper-reagent row ${row.id} has null title`)
  }
  const eav = REAGENT_EAV_SCHEMA.parse({
    key: row.key,
    itemId: row.itemId,
    icon: row.icon,
    effects: row.effects,
  })
  return {
    id: row.id,
    name: row.title,
    key: eav.key,
    itemId: eav.itemId,
    icon: eav.icon,
    effects: eav.effects,
  }
}

export function generateTemperReagents(reagentRows: readonly Page[]): string {
  const reagents = reagentRows.map(parseReagent)

  const sorted = [...reagents].sort((a, b) => a.key.localeCompare(b.key))

  const seen = new Set<string>()
  for (const r of sorted) {
    if (seen.has(r.key)) {
      throw new Error(`temper-reagent: duplicate key '${r.key}' across multiple rows`)
    }
    seen.add(r.key)
  }

  const lines = sorted.map((r) => {
    const eff = `[${r.effects.map((e) => JSON.stringify(e)).join(", ")}]`
    return `  { id: ${JSON.stringify(r.key)}, name: ${JSON.stringify(r.name)}, itemId: ${r.itemId}, icon: ${JSON.stringify(r.icon)}, effects: ${eff} },`
  })

  return `\
/**
 * Temper Reagents (Generated)
 *
 * ESO alchemy reagents sourced from the universal pages table (page type:
 * temper-reagent). Each row carries the kebab \`id\` (formerly the in-source
 * map key), display \`name\`, ESO numeric \`itemId\`, addon-resource \`icon\`
 * path, and the 4-tuple of poison-effect ids that drive the crafting
 * combination logic.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { Reagent } from "../reagents-data"

export const REAGENTS = [
${lines.join("\n")}
] as const satisfies readonly Reagent[]
`
}
