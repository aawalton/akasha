import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const TTC_KIOSK_LOCATION_EAV_SCHEMA = z
  .object({
    kioskId: z.number().int().nonnegative(),
  })
  .strict()

interface ParsedTtcKioskLocation {
  kioskId: number
  title: string
}

function parseTtcKioskLocation(row: Page): ParsedTtcKioskLocation {
  if (row.title === null) {
    throw new Error(`temper-guild-trader row ${row.id} has null title`)
  }
  const eav = TTC_KIOSK_LOCATION_EAV_SCHEMA.parse({
    kioskId: row.kioskId,
  })
  return {
    kioskId: eav.kioskId,
    title: row.title,
  }
}

export function generateTemperTtcKioskLocation(rows: readonly Page[]): string {
  const parsed = rows.map(parseTtcKioskLocation)

  const sorted = [...parsed].sort((a, b) => a.kioskId - b.kioskId)

  const entries = sorted.map((k) => `  ${k.kioskId}: ${JSON.stringify(k.title)},`)

  return `\
/**
 * TTC Guild Kiosk Locations (Generated)
 *
 * ${sorted.length} kiosk location names (kioskID -> "Zone: City"), sourced
 * from the universal pages table (page type: temper-guild-trader).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

/** Display names for TTC guild kiosk locations (kioskID -> "Zone: City"). */
export const TTC_KIOSK_LOCATIONS: Record<number, string> = {
${entries.join("\n")}
}
`
}
