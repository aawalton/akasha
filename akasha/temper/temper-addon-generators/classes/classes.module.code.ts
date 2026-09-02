import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const CLASS_EAV_SCHEMA = z
  .object({
    key: z.string(),
    esoClassId: z.number().int().nonnegative(),
  })
  .strict()

interface ParsedClass {
  key: string
  name: string
  icon: string
  esoClassId: number
}

function parseClass(row: Page): ParsedClass {
  if (row.title === null) {
    throw new Error(`temper-class row ${row.id} has null title`)
  }
  const icon = row.icon ?? ""
  if (typeof icon !== "string") {
    throw new Error(`temper-class row ${row.id} has non-string icon`)
  }
  const eav = CLASS_EAV_SCHEMA.parse({
    key: row.key,
    esoClassId: row.esoClassId,
  })
  return {
    key: eav.key,
    name: row.title,
    icon,
    esoClassId: eav.esoClassId,
  }
}

export function generateTemperClass(rows: readonly Page[]): string {
  const parsed = rows.map(parseClass)

  const sorted = [...parsed].sort((a, b) => a.key.localeCompare(b.key))

  const entries = sorted.map((c) => {
    return `  ${JSON.stringify(c.key)}: { id: ${JSON.stringify(c.key)}, name: ${JSON.stringify(c.name)}, icon: ${JSON.stringify(c.icon)}, esoClassId: ${c.esoClassId} },`
  })

  return `\
/**
 * Temper Classes (Generated)
 *
 * ESO playable character classes (plus the "no-class" sentinel),
 * sourced from the universal pages table (page type: temper-class).
 *
 * Each entry's \`id\` is the stable codec-facing identifier
 * ("arcanist" / "dragonknight" / ...) and the same string is used
 * as the record key, so \`TEMPER_CLASSES["arcanist"]\` is well-typed
 * and feeds the \`ClassId\` union and the \`classes.data\` lookup
 * in @temper/game-characters-classes.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { ClassId } from "@temper/shared-formula-framework/class-id"

interface ClassTemplate {
  id: ClassId
  name: string
  icon: string
  esoClassId: number
}

export const TEMPER_CLASSES = {
${entries.join("\n")}
} as const satisfies Record<ClassId, ClassTemplate>
`
}
