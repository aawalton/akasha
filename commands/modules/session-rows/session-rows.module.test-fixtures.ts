import { mkdirSync } from "node:fs"
import { join } from "node:path"
import { repoWith } from "../../../command-system/landing/landing.module.test-fixtures.ts"
import { ACTIVITIES_AT, DAYS_AT, RELATIONSHIPS_AT } from "./session-rows.module.code.ts"

export const DAY = "2026-09-01"

const NAMED = `${DAYS_AT}/${DAY}/wake-day-${DAY}.wake-day`

const PAGE_AT = `${NAMED}.ts`

export const ROWS_AT = `${NAMED}.sessions.jsonl`

const PAGE_ID = "01a06818-339b-7fc2-8cd9-caea195150b2"

const PAGE = `export const held = { id: "${PAGE_ID}" }\n`

export const SLEPT = "01a06818-339b-7fc2-8cd9-caea195150b3"

const ROW = `{"id":"${SLEPT}","title":"Slept","startTime":"2026-09-01T06:00:00.000Z","dailyTracking":"${PAGE_ID}","endTime":"2026-09-01T14:00:00.000Z"}\n`

export function dayRepo(): string {
  const root = repoWith({ [PAGE_AT]: PAGE, [ROWS_AT]: ROW })
  for (const one of [ACTIVITIES_AT, RELATIONSHIPS_AT]) {
    mkdirSync(join(root, one), { recursive: true })
  }
  return root
}
