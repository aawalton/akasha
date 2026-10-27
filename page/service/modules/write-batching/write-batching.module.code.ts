import { addIfNotPresentFile } from "akasha/change/mechanical/file/add-if-not-present-file/add-if-not-present-file.change-mechanical-file.ts"
import { changeMechanicalFile } from "akasha/change/mechanical/file/change-mechanical-file.page-type.ts"
import { removeFile } from "akasha/change/mechanical/file/remove/remove-file/remove-file.change-mechanical-file.ts"
import type { Asking } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { partWay } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type {
  Asked,
  Kept,
} from "akasha/page/service/modules/page-writing/page-writing.module.code.ts"

const ABOVE = ".."

const PARTED_BY = "/"

const WRITTEN_BY = "Written-by: "

const APART = "\n\n---\n\n"

const AUTHORED = /^[^<>]+ <[^<>@\s]+@[^<>\s]+>$/

export const PUT = `${changeMechanicalFile.slug}/${addIfNotPresentFile.slug}` as const

export const TAKE = `${changeMechanicalFile.slug}/${removeFile.slug}` as const

export type Edit = Extract<Asking, { readonly at: typeof PUT | typeof TAKE }>

export function pathsIn(asked: Asked): readonly string[] {
  return [
    ...(asked.puts ?? []).map((one) => one.path),
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
  return null
}

export function editsIn(asked: Asked): readonly Edit[] {
  const puts = (asked.puts ?? []).map(
    (one): Edit => ({ at: PUT, given: { at: one.path, body: one.content } })
  )
  const takes = (asked.removes ?? []).map((one): Edit => ({ at: TAKE, given: { at: one } }))
  return [...puts, ...takes]
}

export function messageIn(batch: readonly Asked[]): string {
  const each = batch.map((one) => `${one.message.trim()}\n\n${WRITTEN_BY}${one.writer}`)
  const first = each[0]
  if (batch.length === 1 && first !== undefined) return first
  return `${batch.length} writes arrived together, so they land together\n\n${each.join(APART)}`
}

export function latestIn(batch: readonly Asked[]): readonly Edit[] {
  const held = new Map<string, Edit>()
  for (const one of batch) for (const edit of editsIn(one)) held.set(edit.given.at, edit)
  return [...held.values()]
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
  const put = asked.filter((one) => one.at === PUT).map((one) => one.given.at)
  return {
    wrote: [...new Set([...landed.filter((one) => !gone.has(one)), ...put])],
    took: landed.filter((one) => gone.has(one)),
  }
}
