import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const LOCATION_TYPE_EAV_SCHEMA = z
  .object({
    key: z.string(),
    displayOrder: z.number().int().nonnegative(),
  })
  .strict()

interface ParsedLocationType {
  key: string
  name: string
  displayOrder: number
}

function parseRow(row: Page): ParsedLocationType {
  if (row.title === null) {
    throw new Error(`temper-location-type row ${row.id} has null title`)
  }
  if (typeof row.title !== "string") {
    throw new Error(`temper-location-type row ${row.id} has non-string title`)
  }
  const eav = LOCATION_TYPE_EAV_SCHEMA.parse({
    key: row.key,
    displayOrder: row.displayOrder,
  })
  return {
    key: eav.key,
    name: row.title,
    displayOrder: eav.displayOrder,
  }
}

export function generateTemperLocationType(rows: readonly Page[]): string {
  const parsed = rows.map(parseRow)
  const sorted = [...parsed].sort((a, b) => a.displayOrder - b.displayOrder)

  const entryLines = sorted.map((r) => {
    const keyLiteral = JSON.stringify(r.key)
    return `  ${keyLiteral}: { id: ${keyLiteral} as const, name: ${JSON.stringify(r.name)} },`
  })

  return `\
/**
 * Temper Location Types (Generated)
 *
 * ESO inventory location categories sourced from the universal pages table
 * (page type: temper-location-type).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import { createDataFile } from "@akasha/utils-narrow/create-data-file"
import type { LocationTypeTemplate } from "../location-type-data"

const LOCATION_TYPE_DATA = {
${entryLines.join("\n")}
} satisfies Record<string, LocationTypeTemplate>

export const locationTypes = createDataFile<LocationTypeTemplate>()(LOCATION_TYPE_DATA)
`
}
