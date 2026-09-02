import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const CURSE_EAV_SCHEMA = z
  .object({
    curseId: z.string().min(1),
    displayOrder: z.number().int().nonnegative(),
    esoCurseIds: z.array(z.coerce.number().int().nonnegative()).default([]),
  })
  .strict()

interface ParsedCurse {
  curseId: string
  label: string
  displayOrder: number
  esoCurseIds: readonly number[]
}

function parseCurse(row: Page): ParsedCurse {
  if (row.title === null) {
    throw new Error(`temper-curse row ${row.id} has null title`)
  }
  const eav = CURSE_EAV_SCHEMA.parse({
    curseId: row.curseId,
    displayOrder: row.displayOrder,
    esoCurseIds: row.esoCurseIds,
  })
  return {
    curseId: eav.curseId,
    label: row.title,
    displayOrder: eav.displayOrder,
    esoCurseIds: eav.esoCurseIds,
  }
}

export function generateTemperCurse(curseRows: readonly Page[]): string {
  const curses = curseRows.map(parseCurse)

  const sorted = [...curses].sort((a, b) => a.displayOrder - b.displayOrder)

  const seen = new Set<number>()
  for (const c of sorted) {
    if (seen.has(c.displayOrder)) {
      throw new Error(
        `temper-curse ${c.curseId}: duplicate displayOrder ${c.displayOrder} (codec index would be ambiguous)`
      )
    }
    seen.add(c.displayOrder)
  }

  const arrayLines = sorted.map((c) => {
    const ids = c.esoCurseIds.join(", ")
    return `  { id: ${JSON.stringify(c.curseId)}, name: ${JSON.stringify(c.label)}, esoCurseIds: [${ids}] },`
  })

  const recordEntries = sorted.map((c) => {
    const ids = c.esoCurseIds.join(", ")
    return `  ${JSON.stringify(c.curseId)}: { id: ${JSON.stringify(c.curseId)} as const, name: ${JSON.stringify(c.label)}, esoCurseIds: [${ids}] },`
  })

  return `\
/**
 * Temper Curses (Generated)
 *
 * ESO character curse states (vampire, werewolf, no-curse), sourced from
 * the universal pages table (page type: temper-curse).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

interface CurseTemplate {
  id: string
  name: string
  esoCurseIds: readonly number[]
}

/**
 * Array snapshot — preserves displayOrder. Useful when callers need a
 * stable iteration order without consulting the data-file helper.
 */
export const TEMPER_CURSES = [
${arrayLines.join("\n")}
] as const satisfies readonly CurseTemplate[]

/**
 * Keyed record. The literal-id keys flow into \`createDataFile\`'s
 * \`curses.ids\` so \`z.enum(curses.ids)\` and \`(typeof curses.ids)[number]\`
 * stay literal-union typed for callers in \`build-schema.ts\` and
 * \`build-codec-indices.ts\`.
 */
export const TEMPER_CURSES_BY_ID = {
${recordEntries.join("\n")}
} satisfies Record<string, CurseTemplate>
`
}
