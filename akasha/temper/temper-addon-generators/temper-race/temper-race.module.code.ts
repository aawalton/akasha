import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const RACE_EAV_SCHEMA = z
  .object({
    key: z.string(),
    altName: z.string().default(""),
    esoRaceId: z.number().int().nonnegative(),
  })
  .strict()

interface ParsedRace {
  key: string
  name: string
  altName: string
  esoRaceId: number
}

function parseRace(row: Page): ParsedRace {
  if (row.title === null) {
    throw new Error(`temper-race row ${row.id} has null title`)
  }
  const eav = RACE_EAV_SCHEMA.parse({
    key: row.key,
    altName: row.altName,
    esoRaceId: row.esoRaceId,
  })
  return {
    key: eav.key,
    name: row.title,
    altName: eav.altName,
    esoRaceId: eav.esoRaceId,
  }
}

function rankOf(race: ParsedRace): number {
  if (race.key === "no-race") return -1
  return race.esoRaceId
}

export function generateTemperRace(raceRows: readonly Page[]): string {
  const races = raceRows.map(parseRace)
  const sorted = [...races].sort((a, b) => {
    const rankDelta = rankOf(a) - rankOf(b)
    if (rankDelta !== 0) return rankDelta
    return a.key.localeCompare(b.key)
  })

  const entryLines = sorted.map((r) => {
    const keyLiteral = JSON.stringify(r.key)
    return `  ${keyLiteral}: { id: ${keyLiteral} as const, name: ${JSON.stringify(r.name)}, altName: ${JSON.stringify(r.altName)}, esoRaceId: ${r.esoRaceId} },`
  })

  return `\
/**
 * Temper Races (Generated)
 *
 * ESO playable character races sourced from the universal pages table
 * (page type: temper-race).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import { createDataFile } from "@akasha/utils-narrow/create-data-file"
import type { RaceTemplate } from "../races"

const RACE_DATA = {
${entryLines.join("\n")}
} satisfies Record<string, RaceTemplate>

export const races = createDataFile<RaceTemplate>()(RACE_DATA)
`
}
