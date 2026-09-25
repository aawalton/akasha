import { existsSync, mkdirSync, renameSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { addIfNotPresentFile } from "akasha/change/mechanical/file/add-if-not-present-file/add-if-not-present-file.change-mechanical-file.ts"
import { changeMechanicalFile } from "akasha/change/mechanical/file/change-mechanical-file.page-type.ts"
import { removeFile } from "akasha/change/mechanical/file/remove/remove-file/remove-file.change-mechanical-file.ts"

import {
  type Asking,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { textOf } from "akasha/code/body/modules/body-text/body-text.module.code.ts"
import { INPUT, partWay } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Refused } from "akasha/command/modules/landing/landing.module.code.ts"
import { diskAt } from "akasha/command/modules/landing-change-composing/landing-change-composing.module.code.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"

import { mergeUncommitted } from "akasha/page/modules/uncommitted/page-uncommitted.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type {
  Fault,
  Faulted,
} from "akasha/page/service/modules/refusal-fault/refusal-fault.module.code.ts"

export type Put = {
  readonly path: string
  readonly content: string
}

export type Kept = {
  readonly path: string
  readonly values: Value
}

export type Fresh = {
  readonly pageTypeSlug: string
  readonly slug: string
  readonly path: string
}

export type Asked = {
  readonly writer: string
  readonly message: string
  readonly puts?: readonly Put[]
  readonly removes?: readonly string[]
  readonly kept?: readonly Kept[]
  readonly keptPuts?: readonly Put[]
  readonly keptRemoves?: readonly string[]
  readonly read?: string
  readonly fresh?: readonly Fresh[]
}

export type Wrote =
  | {
      readonly commit: string | null
      readonly wrote: readonly string[]
      readonly took: readonly string[]
    }
  | { readonly refused: string }

type Writing = {
  readonly root: string
}

export type Writer = {
  readonly writing: (asked: Asked) => Promise<Faulted<Wrote>>
  readonly alone: <T>(act: () => Promise<T>) => Promise<T>
}

const ABOVE = ".."

const PARTED_BY = "/"

const WRITTEN_BY = "Written-by: "

const APART = "\n\n---\n\n"

const AUTHORED = /^[^<>]+ <[^<>@\s]+@[^<>\s]+>$/

const PUT = `${changeMechanicalFile.slug}/${addIfNotPresentFile.slug}` as const

const TAKE = `${changeMechanicalFile.slug}/${removeFile.slug}` as const

type Edit = Extract<Asking, { readonly at: typeof PUT | typeof TAKE }>

export function pathsIn(asked: Asked): readonly string[] {
  return [
    ...(asked.puts ?? []).map((one) => one.path),
    ...(asked.removes ?? []),
    ...(asked.kept ?? []).map((one) => one.path),
    ...(asked.keptPuts ?? []).map((one) => one.path),
    ...(asked.keptRemoves ?? []),
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

const PART = "part"

function filedOutside(root: string, files: ReadonlyMap<string, string | null>): readonly string[] {
  const wrote: string[] = []
  for (const [path, content] of files) {
    const full = join(root, path)
    if (content === null) {
      rmSync(full, { force: true })
      continue
    }
    mkdirSync(dirname(full), { recursive: true })
    const scratch = `${full}.${process.pid}.${PART}`
    writeFileSync(scratch, content, "utf8")
    renameSync(scratch, full)
    wrote.push(path)
  }
  return wrote
}

function beside(root: string, batch: readonly Asked[], kept: readonly Kept[]): readonly string[] {
  const filed = filedOutside(root, keptFilesIn(batch))
  for (const one of kept) mergeUncommitted(root, one.path, one.values)
  return [...filed, ...kept.map((one) => one.path)]
}

export function landedFault(said: Refused): Fault {
  if (said.moved === true) return "race"
  return said.code === INPUT ? "caller" : "service"
}

export async function landedIn(root: string, batch: readonly Asked[]): Promise<Faulted<Wrote>> {
  const first = batch[0]
  if (first === undefined)
    return { refused: "a batch carries at least one write", fault: "service" }
  const done: string[] = []
  try {
    const kept = keptIn(batch)
    const changes = latestIn(batch)
    if (changes.length === 0) return { commit: null, wrote: beside(root, batch, kept), took: [] }
    const asked = changes
    const said = await runMechanicalChange(root, asked, messageIn(batch), {
      writer: first.writer,
      read: first.read ?? null,
      done,
    })
    if ("refusals" in said) return { refused: said.refusals.join(" — "), fault: landedFault(said) }
    const gone = new Set(asked.filter((one) => one.at === TAKE).map((one) => one.given.at))
    return {
      commit: said.commit,
      wrote: [...said.landed.filter((one) => !gone.has(one)), ...beside(root, batch, kept)],
      took: said.landed.filter((one) => gone.has(one)),
    }
  } catch (thrown) {
    return { refused: thrownWhy(batch, thrown, done), fault: "service" }
  }
}

type Waiting = {
  readonly asked: Asked
  readonly settle: (wrote: Faulted<Wrote>) => unknown
}

type Held = { readonly asked: Asked }

export function batchIn<T extends Held>(
  waiting: readonly T[]
): { readonly batch: readonly T[]; readonly rest: readonly T[] } {
  const first = waiting[0]
  if (first === undefined) return { batch: [], rest: [] }
  if (first.asked.read !== undefined) return { batch: [first], rest: waiting.slice(1) }
  let taken = 1
  while (taken < waiting.length && waiting[taken]?.asked.read === undefined) taken += 1
  return { batch: waiting.slice(0, taken), rest: waiting.slice(taken) }
}

function freshRefusal(one: Fresh): string {
  return `\`${one.pageTypeSlug}/${one.slug}\` is a page already, and a page written as new takes a slug no page of its type has`
}

type Claimed<T> = {
  readonly landing: readonly T[]
  readonly refused: readonly (readonly [T, string])[]
}

function claimedIn<T extends Held>(root: string, batch: readonly T[]): Claimed<T> {
  const named = new Set<string>()
  const put = new Set<string>()
  const landing: T[] = []
  const refused: (readonly [T, string])[] = []
  for (const one of batch) {
    const taken = (one.asked.fresh ?? []).find(
      (fresh) =>
        named.has(`${fresh.pageTypeSlug}/${fresh.slug}`) ||
        put.has(fresh.path) ||
        listedAt(root, fresh.pageTypeSlug, fresh.slug).length > 0
    )
    if (taken !== undefined) {
      refused.push([one, freshRefusal(taken)])
      continue
    }
    landing.push(one)
    for (const fresh of one.asked.fresh ?? []) named.add(`${fresh.pageTypeSlug}/${fresh.slug}`)
    for (const each of one.asked.puts ?? []) put.add(each.path)
  }
  return { landing, refused }
}

function unreadRefusal(paths: readonly string[]): string {
  const named = paths.map((one) => `\`${one}\``).join(", ")
  return (
    `${named} holds a body already, and a write changing a body already there states the commit ` +
    "it read that body at as `read` — read the page, and send the commit that read answered"
  )
}

function unreadPaths(root: string, asked: Asked, put: ReadonlySet<string>): readonly string[] {
  const claimed = new Set((asked.fresh ?? []).map((one) => one.path))
  const unread: string[] = []
  for (const one of asked.puts ?? []) {
    if (claimed.has(one.path)) continue
    if (put.has(one.path)) unread.push(one.path)
    else {
      const held = textOf(diskAt(root, one.path))
      if (held !== null && held !== one.content) unread.push(one.path)
    }
  }
  for (const gone of asked.removes ?? []) {
    if (put.has(gone) || existsSync(join(root, gone))) unread.push(gone)
  }
  return unread
}

export function unreadIn<T extends Held>(root: string, batch: readonly T[]): Claimed<T> {
  const put = new Set<string>()
  const landing: T[] = []
  const refused: (readonly [T, string])[] = []
  for (const one of batch) {
    const unread = one.asked.read === undefined ? unreadPaths(root, one.asked, put) : []
    if (unread.length > 0) {
      refused.push([one, unreadRefusal(unread)])
      continue
    }
    landing.push(one)
    for (const edit of editsIn(one.asked)) put.add(edit.given.at)
  }
  return { landing, refused }
}

export function writerFor(given: Writing): Writer {
  let waiting: Waiting[] = []
  const acts: (() => Promise<unknown>)[] = []
  let running = false
  const settling = async (): Promise<undefined> => {
    while (acts.length > 0 || waiting.length > 0) {
      const act = acts.shift()
      if (act !== undefined) {
        await act()
        continue
      }
      const taken = batchIn(waiting)
      waiting = [...taken.rest]
      const read = unreadIn(given.root, taken.batch)
      for (const [one, refused] of read.refused) one.settle({ refused, fault: "caller" })
      const claimed = claimedIn(given.root, read.landing)
      if (claimed.landing.length > 0) {
        const wrote = await landedIn(
          given.root,
          claimed.landing.map((one) => one.asked)
        )
        for (const one of claimed.landing) one.settle(wrote)
      }
      for (const [one, refused] of claimed.refused) one.settle({ refused, fault: "caller" })
    }
    running = false
    return undefined
  }
  const started = (): undefined => {
    if (running) return
    running = true
    setTimeout(settling, 0)
  }
  return {
    writing: (asked) => {
      const refused = refusalIn(asked)
      if (refused !== null) return Promise.resolve({ refused, fault: "caller" })
      return new Promise<Faulted<Wrote>>((settle) => {
        waiting.push({ asked, settle })
        started()
      })
    },
    alone: (act) =>
      new Promise((settle, fail) => {
        acts.push(() => Promise.resolve().then(act).then(settle, fail))
        started()
      }),
  }
}
