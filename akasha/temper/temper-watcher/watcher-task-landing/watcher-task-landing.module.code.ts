import type {
  Landed,
  LandingDeps,
  Tried,
} from "../watcher-page-landing/watcher-page-landing.module.code.ts"
import {
  closingFor,
  contentIn,
  landOverAttempts,
  PAGE_LANDING_WRITER,
  pagePathIn,
  readingFor,
  removingFor,
  rowsPathIn,
  triedFrom,
  writingFor,
} from "../watcher-page-landing/watcher-page-landing.module.code.ts"

const FOLDER = "akasha/temper/temper-progress/tasks/pages"

const ROWS_PROPERTY = "progress"

export const TASK_PAGE_TYPE_SLUG = "temper-task"

export type TaskValues = Readonly<Record<string, string | number | boolean | null>>

export function taskPagePath(slug: string): string {
  return pagePathIn(FOLDER, slug, TASK_PAGE_TYPE_SLUG)
}

export function taskProgressPath(slug: string): string {
  return rowsPathIn(FOLDER, slug, TASK_PAGE_TYPE_SLUG, ROWS_PROPERTY)
}

function keyLine(key: string): RegExp {
  return new RegExp(`^ {2}${key}: .*,$`, "m")
}

function keyLineAndBreak(key: string): RegExp {
  return new RegExp(`^ {2}${key}: .*,\\n`, "m")
}

export function taskBodyWith(body: string, values: TaskValues): string | null {
  const closing = closingFor(TASK_PAGE_TYPE_SLUG)
  let put = body
  for (const [key, value] of Object.entries(values)) {
    if (value === null) {
      put = put.replace(keyLineAndBreak(key), "")
      continue
    }
    const found = keyLine(key)
    const line = `  ${key}: ${JSON.stringify(value)},`
    if (found.test(put)) {
      put = put.replace(found, line)
      continue
    }
    const at = put.lastIndexOf(closing)
    if (at < 0) return null
    put = `${put.slice(0, at)}${line}\n${put.slice(at)}`
  }
  return put === body ? null : put
}

export async function landTaskValues(
  slug: string,
  values: TaskValues,
  message: string,
  deps: LandingDeps = {}
): Promise<Landed> {
  const read = readingFor(deps)
  const write = writingFor(deps)
  const path = taskPagePath(slug)
  const tryOnce = async (): Promise<Tried> => {
    const found = await read([path])
    if (!found.ok) return { outcome: "again", why: found.why }
    const held = contentIn(found.bodies, path)
    if (held === null) return { outcome: "refused", why: `the store holds no body at ${path}` }
    const content = taskBodyWith(held, values)
    if (content === null) return { outcome: "already", at: found.at }
    return triedFrom(
      await write([{ path, content }], PAGE_LANDING_WRITER, message, undefined, undefined, found.at)
    )
  }
  return landOverAttempts(`no attempt to land ${path} was made`, tryOnce, deps)
}

export async function landTaskGone(
  slug: string,
  beside: readonly string[],
  message: string,
  deps: LandingDeps = {}
): Promise<Landed> {
  const read = readingFor(deps)
  const remove = removingFor(deps)
  const path = taskPagePath(slug)
  const paths = [path, ...beside]
  const tryOnce = async (): Promise<Tried> => {
    const found = await read(paths)
    if (!found.ok) return { outcome: "again", why: found.why }
    const held = found.bodies.filter((one) => one.content !== null).map((one) => one.path)
    if (held.length === 0) return { outcome: "already", at: found.at }
    return triedFrom(
      await remove(held, PAGE_LANDING_WRITER, message, undefined, undefined, found.at)
    )
  }
  return landOverAttempts(`no attempt to take ${path} away was made`, tryOnce, deps)
}
