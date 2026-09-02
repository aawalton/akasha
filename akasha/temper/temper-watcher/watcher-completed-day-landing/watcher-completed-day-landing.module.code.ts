import type {
  Landed,
  LandingDeps,
  Tried,
} from "../watcher-page-landing/watcher-page-landing.module.code.ts"
import {
  contentIn,
  insertedByInstant,
  jsonIn,
  jsonlBodyOf,
  jsonlLinesOf,
  jsonRowOf,
  landOverAttempts,
  PAGE_LANDING_WRITER,
  pageBodyFor,
  pagePathIn,
  readingFor,
  rowsPathIn,
  textIn,
  textOf,
  triedFrom,
  writingFor,
} from "../watcher-page-landing/watcher-page-landing.module.code.ts"

const FOLDER = "akasha/temper/temper-progress/completed-days/pages"

const ROWS_PROPERTY = "completions"

const DAY_LENGTH = 10

export const COMPLETED_DAY_PAGE_TYPE_SLUG = "temper-completed-day"

export type ItemPathPart = string | number

export type CompletionValues = {
  readonly id: string
  readonly completedAt: string
  readonly task?: string | undefined
  readonly title?: string | undefined
  readonly character?: string | undefined
  readonly esoCharacterId?: string | undefined
  readonly dueDate?: string | undefined
  readonly completionCardId?: string | undefined
  readonly completionItemPath?: readonly ItemPathPart[] | undefined
}

function told(value: string | undefined): string | undefined {
  return value === undefined || value === "" ? undefined : value
}

function itemPathTold(value: readonly ItemPathPart[] | undefined): readonly string[] | undefined {
  return value === undefined || value.length === 0 ? undefined : value.map(String)
}

export function completedDayOf(completedAt: string): string {
  return completedAt.slice(0, DAY_LENGTH)
}

export function completedDaySlug(day: string): string {
  return `day-${day}`
}

export function completedDayPagePath(day: string): string {
  return pagePathIn(FOLDER, completedDaySlug(day), COMPLETED_DAY_PAGE_TYPE_SLUG)
}

export function completedDayLinesPath(day: string): string {
  return rowsPathIn(FOLDER, completedDaySlug(day), COMPLETED_DAY_PAGE_TYPE_SLUG, ROWS_PROPERTY)
}

export function completedDayBody(day: string, id: string): string {
  return pageBodyFor(COMPLETED_DAY_PAGE_TYPE_SLUG, completedDaySlug(day), id, [
    ["title", day],
    ["day", day],
    [ROWS_PROPERTY, "jsonl"],
  ])
}

export function completionLine(values: CompletionValues): string {
  const task = told(values.task)
  return jsonRowOf([
    ["id", values.id],
    ["completedAt", values.completedAt],
    ["task", task],
    ["title", task === undefined ? told(values.title) : undefined],
    ["character", told(values.character)],
    ["esoCharacterId", told(values.esoCharacterId)],
    ["dueDate", told(values.dueDate)],
    ["completionCardId", told(values.completionCardId)],
    ["completionItemPath", itemPathTold(values.completionItemPath)],
  ])
}

function namesIn(line: string): string {
  const held = jsonIn(line)
  if (held === null) return ""
  return `${textOf(held, "task")} ${textOf(held, "title")}`
}

export function completionsWith(body: string | null, values: CompletionValues): string | null {
  const line = completionLine(values)
  const held = jsonlLinesOf(body)
  const names = namesIn(line)
  for (const one of held) {
    if (textIn(one, "id") === values.id) return null
    if (textIn(one, "completedAt") === values.completedAt && namesIn(one) === names) return null
  }
  return jsonlBodyOf(insertedByInstant(held, line, "completedAt", values.completedAt))
}

export function completionsWithout(body: string | null, id: string): string | null {
  if (body === null) return null
  const held = jsonlLinesOf(body)
  const put = held.filter((one) => textIn(one, "id") !== id)
  return put.length === held.length ? null : jsonlBodyOf(put)
}

export function completionCommitMessage(values: CompletionValues, day: string): string {
  return `temper: a completion of ${values.task ?? values.title ?? "a task"} on ${day}`
}

export async function landCompletion(
  values: CompletionValues,
  minted: () => string,
  deps: LandingDeps = {}
): Promise<Landed> {
  const read = readingFor(deps)
  const write = writingFor(deps)
  const day = completedDayOf(values.completedAt)
  const pagePath = completedDayPagePath(day)
  const linesPath = completedDayLinesPath(day)
  const tryOnce = async (): Promise<Tried> => {
    const found = await read([pagePath, linesPath])
    if (!found.ok) return { outcome: "again", why: found.why }
    const content = completionsWith(contentIn(found.bodies, linesPath), values)
    if (content === null) return { outcome: "already", at: found.at }
    const puts = [{ path: linesPath, content }]
    if (contentIn(found.bodies, pagePath) === null) {
      puts.unshift({ path: pagePath, content: completedDayBody(day, minted()) })
    }
    const message = completionCommitMessage(values, day)
    return triedFrom(
      await write(puts, PAGE_LANDING_WRITER, message, undefined, undefined, found.at)
    )
  }
  return landOverAttempts(`no attempt to land a completion on ${linesPath} was made`, tryOnce, deps)
}

export async function clearLandedCompletion(
  day: string,
  id: string,
  deps: LandingDeps = {}
): Promise<Landed> {
  const read = readingFor(deps)
  const write = writingFor(deps)
  const linesPath = completedDayLinesPath(day)
  const tryOnce = async (): Promise<Tried> => {
    const found = await read([linesPath])
    if (!found.ok) return { outcome: "again", why: found.why }
    const content = completionsWithout(contentIn(found.bodies, linesPath), id)
    if (content === null) return { outcome: "already", at: found.at }
    const message = `temper: a completion on ${day} was cleared`
    return triedFrom(
      await write(
        [{ path: linesPath, content }],
        PAGE_LANDING_WRITER,
        message,
        undefined,
        undefined,
        found.at
      )
    )
  }
  return landOverAttempts(`no attempt to clear ${id} from ${linesPath} was made`, tryOnce, deps)
}
