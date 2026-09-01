import type { Judging } from "../../../checks-system/judging/judging.module.code.ts"
import { type FileEdit, landing } from "../../../command-system/landing/landing.module.code.ts"

export type Put = {
  readonly path: string
  readonly content: string
}

export type Asked = {
  readonly writer: string
  readonly message: string
  readonly puts?: readonly Put[]
  readonly removes?: readonly string[]
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

const UNDER = "akasha/"

const ABOVE = ".."

const WRITTEN_BY = "Written-by: "

const APART = "\n\n---\n\n"

const AUTHORED = /^[^<>]+ <[^<>@\s]+@[^<>\s]+>$/

const NOTHING_JUDGES: Judging = {
  named: [],
  checksFor: () => [],
  over: () => [],
}

export function pathsIn(asked: Asked): readonly string[] {
  return [...(asked.puts ?? []).map((one) => one.path), ...(asked.removes ?? [])]
}

export function refusalIn(asked: Asked): string | null {
  if (!AUTHORED.test(asked.writer)) {
    return "a write names its writer as a name and an address, as `Amy <amy@alanwalton.com>`"
  }
  if (asked.message.trim() === "") return "a write says what it is for"
  const paths = pathsIn(asked)
  if (paths.length === 0) return "a write carries at least one path"
  for (const one of paths) {
    if (!one.startsWith(UNDER)) {
      return `\`${one}\` stands outside \`${UNDER}\`, and this answers for akasha alone`
    }
    if (one.split("/").includes(ABOVE)) return `\`${one}\` reaches above the root`
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

export function landedIn(root: string, batch: readonly Asked[]): Wrote {
  const first = batch[0]
  if (first === undefined) return { refused: "a batch carries at least one write" }
  try {
    const said = landing(root, latestIn(batch), messageIn(batch), NOTHING_JUDGES, first.writer)
    if ("refusals" in said) return { refused: said.refusals.join(" — ") }
    return { commit: said.commit, wrote: said.wrote, took: said.took }
  } catch (thrown) {
    return { refused: String(thrown) }
  }
}

type Waiting = {
  readonly asked: Asked
  readonly settle: (wrote: Wrote) => unknown
}

export function writerFor(given: Writing): Writer {
  let waiting: Waiting[] = []
  let running = false
  const settling = (): undefined => {
    while (waiting.length > 0) {
      const batch = waiting
      waiting = []
      const wrote = landedIn(
        given.root,
        batch.map((one) => one.asked)
      )
      for (const one of batch) one.settle(wrote)
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
