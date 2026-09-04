import type { Judging } from "@akasha/checks/judging"
import { formattedBody } from "@akasha/code-system/code-format"
import { type FileEdit, landing } from "@akasha/command-system/landing"
import { mintingOnto } from "@akasha/command-system/value-minting"
import { mergeUncommitted } from "@akasha/pages-system/page-uncommitted"
import type { Value } from "@akasha/pages-system/page-value"

export type Put = {
  readonly path: string
  readonly content: string
}

export type Kept = {
  readonly path: string
  readonly values: Value
}

export type Asked = {
  readonly writer: string
  readonly message: string
  readonly puts?: readonly Put[]
  readonly removes?: readonly string[]
  readonly kept?: readonly Kept[]
  readonly read?: string
}

export type Wrote =
  | {
      readonly commit: string | null
      readonly wrote: readonly string[]
      readonly took: readonly string[]
    }
  | { readonly refused: string }

export type Writing = {
  readonly root: string
}

export type Writer = {
  readonly writing: (asked: Asked) => Promise<Wrote>
}

const ABOVE = ".."

const PARTED_BY = "/"

const WRITTEN_BY = "Written-by: "

const APART = "\n\n---\n\n"

const AUTHORED = /^[^<>]+ <[^<>@\s]+@[^<>\s]+>$/

const NOTHING_JUDGES: Judging = {
  named: [],
  checksFor: () => [],
  over: () => [],
}

export function pathsIn(asked: Asked): readonly string[] {
  return [
    ...(asked.puts ?? []).map((one) => one.path),
    ...(asked.removes ?? []),
    ...(asked.kept ?? []).map((one) => one.path),
  ]
}

export function pathsOver(batch: readonly Asked[]): readonly string[] {
  return [...new Set(batch.flatMap((one) => pathsIn(one)))]
}

export function thrownWhy(batch: readonly Asked[], thrown: unknown): string {
  const said = thrown instanceof Error ? thrown.message : String(thrown)
  const paths = pathsOver(batch)
  if (paths.length === 0) return said
  return `${said} — the write carried ${paths.join(", ")}`
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

export function editsIn(asked: Asked): readonly FileEdit[] {
  return [
    ...(asked.puts ?? []).map((one) => ({
      path: one.path,
      body: new TextEncoder().encode(one.content),
    })),
    ...(asked.removes ?? []).map((one) => ({ path: one, body: null })),
  ]
}

export function messageIn(batch: readonly Asked[]): string {
  const each = batch.map((one) => `${one.message.trim()}\n\n${WRITTEN_BY}${one.writer}`)
  const one = each[0]
  if (batch.length === 1 && one !== undefined) return one
  return `${batch.length} writes arrived together, so they land together\n\n${each.join(APART)}`
}

export function latestIn(batch: readonly Asked[]): readonly FileEdit[] {
  const held = new Map<string, FileEdit>()
  for (const one of batch) for (const edit of editsIn(one)) held.set(edit.path, edit)
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

function beside(root: string, kept: readonly Kept[]): readonly string[] {
  for (const one of kept) mergeUncommitted(root, one.path, one.values)
  return kept.map((one) => one.path)
}

export function tidiedIn(root: string, changes: readonly FileEdit[]): readonly FileEdit[] {
  return mintingOnto(root, changes).changes.map((one) => {
    if (one.body === null) return one
    const said = formattedBody(root, one.path, one.body)
    return said.changed ? { path: one.path, body: said.body } : one
  })
}

export function landedIn(root: string, batch: readonly Asked[]): Wrote {
  const first = batch[0]
  if (first === undefined) return { refused: "a batch carries at least one write" }
  try {
    const kept = keptIn(batch)
    const changes = latestIn(batch)
    if (changes.length === 0) return { commit: null, wrote: beside(root, kept), took: [] }
    const said = landing(
      root,
      tidiedIn(root, changes),
      messageIn(batch),
      NOTHING_JUDGES,
      first.writer,
      first.read ?? null
    )
    if ("refusals" in said) return { refused: said.refusals.join(" — ") }
    return { commit: said.commit, wrote: [...said.wrote, ...beside(root, kept)], took: said.took }
  } catch (thrown) {
    return { refused: thrownWhy(batch, thrown) }
  }
}

type Waiting = {
  readonly asked: Asked
  readonly settle: (wrote: Wrote) => unknown
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

export function writerFor(given: Writing): Writer {
  let waiting: Waiting[] = []
  let running = false
  const settling = (): undefined => {
    while (waiting.length > 0) {
      const taken = batchIn(waiting)
      waiting = [...taken.rest]
      const wrote = landedIn(
        given.root,
        taken.batch.map((one) => one.asked)
      )
      for (const one of taken.batch) one.settle(wrote)
    }
    running = false
    return undefined
  }
  return {
    writing: (asked) => {
      const refused = refusalIn(asked)
      if (refused !== null) return Promise.resolve({ refused })
      return new Promise<Wrote>((settle) => {
        waiting.push({ asked, settle })
        if (running) return
        running = true
        setTimeout(settling, 0)
      })
    },
  }
}
