import { join } from "node:path"
import { indexedRepo } from "@akasha/indexes/indexing/testing"
import { rootOf } from "../../../../../../command-system/rooting/rooting.module.code.ts"
import { DAYS_AT } from "./session-rows.module.code.ts"

export const DAY = "2026-09-01"

const NAMED = `${DAYS_AT}/${DAY}/day-${DAY}.day`

const PAGE_AT = `${NAMED}.ts`

export const ROWS_AT = `${NAMED}.sessions.jsonl`

const PAGE_ID = "01a06818-339b-7fc2-8cd9-caea195150b2"

const PAGE = `export const held = { id: "${PAGE_ID}" }\n`

export const SLEPT = "01a06818-339b-7fc2-8cd9-caea195150b3"

const ROW = `{"id":"${SLEPT}","title":"Slept","startTime":"2026-09-01T06:00:00.000Z","dailyTracking":"${PAGE_ID}","endTime":"2026-09-01T14:00:00.000Z"}\n`

const PUT_UNDER = "changes/mechanical/file/add"

type Reached = {
  readonly slug: string
  readonly type: string
  readonly named: string
  readonly id: string
}

const REACHED: readonly Reached[] = [
  {
    slug: "add-file-of-any-kind",
    type: "change-mechanical",
    named: "addFileOfAnyKind",
    id: "01a06818-339b-7fc2-8cd9-caea195150b4",
  },
  {
    slug: "add-file",
    type: "change-mechanical-file",
    named: "addFile",
    id: "01a06818-339b-7fc2-8cd9-caea195150b5",
  },
]

function pageOf(one: Reached): string {
  return `export const ${one.named} = {
  id: "${one.id}",
  pageTypeSlug: "${one.type}",
  slug: "${one.slug}",
  definition: "a change a track act lands its rows through",
  code: "ts",
} as const
`
}

function changing(): Readonly<Record<string, string>> {
  const found: Record<string, string> = {}
  for (const one of REACHED) {
    const named = `${one.slug}.${one.type}`
    const at = join(rootOf(process.cwd()), PUT_UNDER, one.slug, `${named}.code.ts`)
    found[`akasha/changes/${named}.ts`] = pageOf(one)
    found[`akasha/changes/${named}.code.ts`] = `export { runChange } from "${at}"\n`
  }
  return found
}

export function dayRepo(): string {
  return indexedRepo({ [PAGE_AT]: PAGE, [ROWS_AT]: ROW, ...changing() })
}
