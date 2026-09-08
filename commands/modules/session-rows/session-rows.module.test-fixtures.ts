import { mkdirSync } from "node:fs"
import { join } from "node:path"
import { indexedRepo } from "@akasha/indexes/indexing/testing"
import { rootOf } from "../../../command-system/rooting/rooting.module.code.ts"
import { ACTIVITIES_AT, DAYS_AT, RELATIONSHIPS_AT } from "./session-rows.module.code.ts"

export const DAY = "2026-09-01"

const NAMED = `${DAYS_AT}/${DAY}/wake-day-${DAY}.wake-day`

const PAGE_AT = `${NAMED}.ts`

export const ROWS_AT = `${NAMED}.sessions.jsonl`

const PAGE_ID = "01a06818-339b-7fc2-8cd9-caea195150b2"

const PAGE = `export const held = { id: "${PAGE_ID}" }\n`

export const SLEPT = "01a06818-339b-7fc2-8cd9-caea195150b3"

const ROW = `{"id":"${SLEPT}","title":"Slept","startTime":"2026-09-01T06:00:00.000Z","dailyTracking":"${PAGE_ID}","endTime":"2026-09-01T14:00:00.000Z"}\n`

const PUT = "add-file-of-any-kind.change-mechanical"

const PUT_UNDER = "changes/mechanical/file/add/add-file-of-any-kind"

const PUT_ID = "01a06818-339b-7fc2-8cd9-caea195150b4"

const PUT_PAGE = `export const addFileOfAnyKind = {
  id: "${PUT_ID}",
  pageTypeSlug: "change-mechanical",
  slug: "add-file-of-any-kind",
  definition: "the change a track act lands its rows through",
  code: "ts",
} as const
`

function changing(): Readonly<Record<string, string>> {
  const at = join(rootOf(process.cwd()), PUT_UNDER, `${PUT}.code.ts`)
  return {
    [`akasha/changes/${PUT}.ts`]: PUT_PAGE,
    [`akasha/changes/${PUT}.code.ts`]: `export { runChange } from "${at}"\n`,
  }
}

export function dayRepo(): string {
  const root = indexedRepo({ [PAGE_AT]: PAGE, [ROWS_AT]: ROW, ...changing() })
  for (const one of [ACTIVITIES_AT, RELATIONSHIPS_AT]) {
    mkdirSync(join(root, one), { recursive: true })
  }
  return root
}
