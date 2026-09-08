import { writeFileSync } from "node:fs"
import { join } from "node:path"

export const WORKING_PAGE = "seat-system/seat-turn-states/pages/working.seat-turn-state.ts"

export function colorIn(at: string, color: string): undefined {
  writeFileSync(
    join(at, WORKING_PAGE),
    `export const working = {\n  pageTypeSlug: "seat-turn-state",\n  slug: "working",\n` +
      `  definition: "an agent taking a turn",\n  colorSlug: "${color}",\n} as const\n`
  )
  return undefined
}
