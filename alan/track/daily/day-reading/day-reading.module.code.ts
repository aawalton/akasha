import { kebabisedRow } from "@akasha/pages/akasha-page-values"
import { camelizeKey } from "@akasha/pages-access/file-rows"
import { asking } from "@akasha/pages-service/asking"
import { dataError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import type {
  Answered,
  AnsweredRow,
  Page,
} from "../day-narrow-types/day-narrow-types.module.code.ts"
import { checkoutRoot, DAY_PAGE_TYPE } from "../day-place/day-place.module.code.ts"
import { pageOf } from "../track-pages/track-pages.module.code.ts"

function dayAnswered(
  where: Readonly<Record<string, Readonly<Record<string, unknown>>>>,
  keys: readonly string[] | undefined
): Answered {
  const root = checkoutRoot()
  const asked = asking(root, {
    pageTypeSlug: DAY_PAGE_TYPE,
    where,
    limit: 1,
    ...(keys === undefined ? {} : { keys: keys.map(camelizeKey) }),
  } as never)
  if ("refused" in asked) return { ok: false, why: asked.refused }
  const rows: AnsweredRow[] = asked.rows.map((one) => {
    const row = one as Readonly<Record<string, unknown>>
    return {
      at: typeof row["slug"] === "string" ? row["slug"] : "",
      values: kebabisedRow(row),
    }
  })
  return { ok: true, rows, n: rows.length, unfound: [] }
}

export function askDayByDate(dayStr: string): Promise<Answered> {
  return Promise.resolve(dayAnswered({ date: { is: dayStr } }, undefined))
}

export function askDayById(dailyId: string): Promise<Answered> {
  return Promise.resolve(dayAnswered({ id: { is: dailyId } }, undefined))
}

async function only(asked: Promise<Answered>): Promise<Page | null> {
  const answer = await asked
  if (!answer.ok) throw dataError(`reading ${DAY_PAGE_TYPE} pages: ${answer.why}`)
  const row = answer.rows[0]
  return row === undefined ? null : pageOf(row.values)
}

export function dayByDate(dayStr: string): Promise<Page | null> {
  return only(askDayByDate(dayStr))
}

export function dayById(dailyId: string): Promise<Page | null> {
  return only(askDayById(dailyId))
}

export async function dayValuesByDate(
  dayStr: string,
  keys?: readonly string[]
): Promise<Readonly<Record<string, unknown>> | null> {
  const answer = dayAnswered({ date: { is: dayStr } }, keys)
  if (!answer.ok) throw dataError(`reading the ${DAY_PAGE_TYPE} ${dayStr}: ${answer.why}`)
  const row = answer.rows[0]
  return row === undefined ? null : row.values
}
