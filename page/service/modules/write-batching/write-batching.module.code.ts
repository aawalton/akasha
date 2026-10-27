import { addIfNotPresentFile } from "akasha/change/mechanical/file/add-if-not-present-file/add-if-not-present-file.change-mechanical-file.ts"
import { changeMechanicalFile } from "akasha/change/mechanical/file/change-mechanical-file.page-type.ts"
import { removeFile } from "akasha/change/mechanical/file/remove/remove-file/remove-file.change-mechanical-file.ts"
import { appendLines } from "akasha/change/mechanical/file-content/append-lines/append-lines.change-mechanical-file-content.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import type { Asking } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { partWay } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type {
  Append,
  Asked,
  Kept,
} from "akasha/page/service/modules/page-writing/page-writing.module.code.ts"

const ABOVE = ".."

const PARTED_BY = "/"

const WRITTEN_BY = "Written-by: "

const APART = "\n\n---\n\n"

const AUTHORED = /^[^<>]+ <[^<>@\s]+@[^<>\s]+>$/

const ID_LEAST = 16

export const PUT = `${changeMechanicalFile.slug}/${addIfNotPresentFile.slug}` as const

export const TAKE = `${changeMechanicalFile.slug}/${removeFile.slug}` as const

export const APPEND = `${changeMechanicalFileContent.slug}/${appendLines.slug}` as const

export type Edit = Extract<Asking, { readonly at: typeof PUT | typeof TAKE | typeof APPEND }>

export function pathsIn(asked: Asked): readonly string[] {
  return [
    ...(asked.puts ?? []).map((one) => one.path),
    ...(asked.appends ?? []).map((one) => one.path),
    ...(asked.removes ?? []),
    ...(asked.kept ?? []).map((one) => one.path),
    ...(asked.keptPuts ?? []).map((one) => one.path),
    ...(asked.keptRemoves ?? []),
    ...(asked.claims ?? []).map((one) => one.path),
  ]
}

export function pathsOver(batch: readonly Asked[]): readonly string[] {
  return [...new Set(batch.flatMap((one) => pathsIn(one)))]
}

export function thrownWhy(
  batch: readonly Asked[],
  thrown: unknown,
  done: readonly string[] = []
): string {
  const said = thrown instanceof Error ? thrown.message : String(thrown)
  const paths = pathsOver(batch)
  const carried = paths.length === 0 ? said : `${said} — the write carried ${paths.join(", ")}`
  return [carried, ...partWay(done)].join(" ")
}

export function refusalIn(asked: Asked): string | null {
  if (!AUTHORED.test(asked.writer)) {
    return "a write names its writer as a name and an address, as `Amy <amy@alanwalton.com>`"
  }
  if (asked.message.trim() === "") return "a write says what it is for"
  const paths = pathsIn(asked)
  if (paths.length === 0) return "a write carries at least one path"
  if ((asked.claims ?? []).length > 0 && asked.read === undefined) {
    return "a write claiming a page states the commit it read as `read`, so it lands alone"
  }
  for (const one of paths) {
    if (one === "" || one.startsWith(PARTED_BY)) {
      return `\`${one}\` is no path inside the repository, and this writes what the repository holds`
    }
    if (one.split(PARTED_BY).includes(ABOVE)) return `\`${one}\` reaches above the root`
  }
  for (const one of asked.appends ?? []) {
    if (one.id.length < ID_LEAST) {
      return `an append's \`id\` is ${ID_LEAST} characters or more, so no other line holds it by chance`
    }
    if (!one.content.includes(one.id)) {
      return "an append carries its `id` in its `content`, so the file itself says the append landed"
    }
  }
  return null
}

export function appendsIn(given: unknown): readonly Append[] | string {
  if (!Array.isArray(given)) return "`appends` is a list"
  const appends: Append[] = []
  for (const each of given) {
    if (typeof each !== "object" || each === null) return "`appends` holds JSON objects"
    const [path, content, id] = ["path", "content", "id"].map((key) => Reflect.get(each, key))
    if (typeof path !== "string") return "an append states its `path` as a string"
    if (typeof content !== "string") return "an append states its `content` as a string"
    if (typeof id !== "string") {
      return "an append names itself as `id`, a string, so it lands once however often it is sent"
    }
    appends.push({ path, content, id })
  }
  return appends
}

export function unheldIn(
  batch: readonly Asked[],
  bodyAt: (path: string) => string | null
): { readonly batch: readonly Asked[]; readonly held: readonly string[] } {
  const bodies = new Map<string, string | null>()
  const seen = new Set<string>()
  const held: string[] = []
  const landed = (one: Append): boolean => {
    if (seen.has(one.id)) return true
    seen.add(one.id)
    if (!bodies.has(one.path)) bodies.set(one.path, bodyAt(one.path))
    return bodies.get(one.path)?.includes(one.id) === true
  }
  const unheld = batch.map((asked) => {
    if (asked.appends === undefined) return asked
    const appends = asked.appends.filter((one) => {
      if (!landed(one)) return true
      held.push(one.id)
      return false
    })
    return { ...asked, appends }
  })
  return { batch: unheld, held }
}

export function editsIn(asked: Asked): readonly Edit[] {
  const puts = (asked.puts ?? []).map(
    (one): Edit => ({ at: PUT, given: { at: one.path, body: one.content } })
  )
  const takes = (asked.removes ?? []).map((one): Edit => ({ at: TAKE, given: { at: one } }))
  const appends = (asked.appends ?? []).map(
    (one): Edit => ({ at: APPEND, given: { at: one.path, content: one.content } })
  )
  return [...puts, ...takes, ...appends]
}

export function messageIn(batch: readonly Asked[]): string {
  const each = batch.map((one) => `${one.message.trim()}\n\n${WRITTEN_BY}${one.writer}`)
  const first = each[0]
  if (batch.length === 1 && first !== undefined) return first
  return `${batch.length} writes arrived together, so they land together\n\n${each.join(APART)}`
}

export function latestIn(batch: readonly Asked[]): readonly Edit[] {
  const held = new Map<string, Edit>()
  const appended: Edit[] = []
  for (const one of batch) {
    for (const edit of editsIn(one)) {
      if (edit.at === APPEND) appended.push(edit)
      else held.set(edit.given.at, edit)
    }
  }
  return [...held.values(), ...appended]
}

export function keptIn(batch: readonly Asked[]): readonly Kept[] {
  const held = new Map<string, Value>()
  for (const one of batch) {
    for (const kept of one.kept ?? []) {
      held.set(kept.path, { ...(held.get(kept.path) ?? {}), ...kept.values })
    }
  }
  return [...held].map(([path, values]) => ({ path, values }))
}

export function keptFilesIn(batch: readonly Asked[]): ReadonlyMap<string, string | null> {
  const held = new Map<string, string | null>()
  for (const one of batch) {
    for (const gone of one.keptRemoves ?? []) held.set(gone, null)
    for (const put of one.keptPuts ?? []) held.set(put.path, put.content)
  }
  return held
}

export function wroteBy(
  asked: readonly Edit[],
  landed: readonly string[]
): { readonly wrote: readonly string[]; readonly took: readonly string[] } {
  const gone = new Set(asked.filter((one) => one.at === TAKE).map((one) => one.given.at))
  const put = asked.filter((one) => one.at === PUT || one.at === APPEND).map((one) => one.given.at)
  return {
    wrote: [...new Set([...landed.filter((one) => !gone.has(one)), ...put])],
    took: landed.filter((one) => gone.has(one)),
  }
}
