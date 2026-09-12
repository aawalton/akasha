import { writeFileSync } from "node:fs"
import { join } from "node:path"
import { listedFiled } from "akasha/pages/indexes/filing/index-filing.module.code.ts"

export const WORKING_PAGE = "agents/seats/turn-states/pages/working.seat-turn-state.ts"

const PAGE_TYPE = "seat-turn-state"

const WORKING = "working"

const WORKING_ID = "01a06964-d998-7c3e-8f55-91ff918f96ac"

export function colorIn(at: string, color: string): undefined {
  writeFileSync(
    join(at, WORKING_PAGE),
    `export const working = {\n  pageTypeSlug: "seat-turn-state",\n  slug: "working",\n` +
      `  definition: "an agent taking a turn",\n  color: "${color}",\n} as const\n`
  )
  listedFiled(at, PAGE_TYPE, WORKING, [{ path: WORKING_PAGE, id: WORKING_ID }])
  return undefined
}
