import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  renameSync,
  rmSync,
  unlinkSync,
  writeFileSync,
} from "node:fs"
import { dirname, join } from "node:path"
import { OK } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/command/modules/calling/calling.module.code.ts"
import { commitAt } from "akasha/command/pages/deploy/modules/commit-naming/deploy-commit-naming.module.code.ts"
import { DEPLOYS } from "akasha/file/modules/git-place/git-place.module.code.ts"
import {
  alive,
  holderOf,
  markIn,
  startedAt,
} from "akasha/file/modules/lock-holder/lock-holder.module.code.ts"
import { gitDirIn } from "akasha/git/modules/dir/git-dir.module.code.ts"
import { abandoned, taken } from "akasha/git/modules/holding/holding.module.code.ts"
import { told } from "akasha/git/modules/running/git-running.module.code.ts"
import { z } from "zod"

const A_LOCK = ".lock"

const A_FINISH = ".finished"

const WAITED = 1000

const FINISHED = z.object({
  mark: z.string(),
  took: z.number(),
  commit: z.string(),
  answer: z.object({
    report: z.array(z.string()),
    refusals: z.array(z.string()),
    code: z.number(),
  }),
})

export type Finished = {
  readonly mark: string
  readonly took: number
  readonly commit: string
  readonly answer: Answer
}

export type Held = { readonly value: Answer } | { readonly refused: string }

export type Onward = () => undefined

const nothing: Onward = () => undefined

export function holdAt(root: string, slug: string): string | null {
  const dir = gitDirIn(root)
  return dir === null ? null : join(dir, DEPLOYS, `${slug}${A_LOCK}`)
}

export function finishedAt(hold: string): string {
  return `${hold.slice(0, -A_LOCK.length)}${A_FINISH}`
}

export function finishedIn(at: string): Finished | null {
  try {
    return FINISHED.parse(JSON.parse(readFileSync(at, "utf8")))
  } catch {
    return null
  }
}

function keptFinished(at: string, finished: Finished): undefined {
  const writing = `${at}.${process.pid}`
  try {
    writeFileSync(writing, JSON.stringify(finished))
    renameSync(writing, at)
  } catch {}
}

export function heldNow(root: string): ReadonlySet<string> {
  const dir = gitDirIn(root)
  const found = new Set<string>()
  if (dir === null) return found
  const at = join(dir, DEPLOYS)
  let names: readonly string[]
  try {
    names = readdirSync(at)
  } catch {
    return found
  }
  for (const name of names) {
    if (!name.endsWith(A_LOCK)) continue
    const holder = holderOf(markIn(join(at, name)))
    if (holder !== null && alive(holder)) found.add(name.slice(0, -A_LOCK.length))
  }
  return found
}

function cleared(at: string, mark: string | null): boolean {
  if (markIn(at) !== mark) return true
  try {
    rmSync(at, { force: true })
  } catch {}
  return !existsSync(at) || markIn(at) !== mark
}

function wentUp(answer: Answer): boolean {
  return answer.code === OK && answer.refusals.length === 0
}

export function carries(root: string, commit: string, arrived: string, follows: boolean): boolean {
  if (commit === arrived) return true
  return follows && told(root, ["merge-base", "--is-ancestor", arrived, commit]) !== null
}

export function saidOfCarried(arrived: string, pid: number, commit: string): string {
  return `carried\t${arrived}\tby the deploy process ${pid} made at ${commit}`
}

export function saidOfNoHold(slug: string, at: string): string {
  return `the hold on \`${slug}\` at ${at} could not be taken and could not be cleared, so nothing was put up`
}

type Arrival = {
  readonly root: string
  readonly kept: string
  readonly before: Finished | null
  readonly at: number
  readonly commit: string
  readonly follows: boolean
}

function sameFinished(one: Finished, two: Finished | null): boolean {
  return two !== null && one.mark === two.mark && one.took === two.took
}

function sharedWith(arrival: Arrival): Answer | null {
  const finished = finishedIn(arrival.kept)
  if (finished === null || sameFinished(finished, arrival.before)) return null
  if (!wentUp(finished.answer) && finished.took <= arrival.at) return null
  if (!carries(arrival.root, finished.commit, arrival.commit, arrival.follows)) return null
  const pid = holderOf(finished.mark)?.pid ?? 0
  const carried = saidOfCarried(arrival.commit, pid, finished.commit)
  return { ...finished.answer, report: [carried, ...finished.answer.report] }
}

export async function heldWhile(
  root: string,
  slug: string,
  arrived: string,
  follows: boolean,
  act: (commit: string) => Promise<Answer>,
  onward: Onward = nothing,
  waited: number = WAITED
): Promise<Held> {
  const at = holdAt(root, slug)
  if (at === null) {
    return { refused: `${root} is no git checkout, so no deploy of \`${slug}\` is held apart` }
  }
  mkdirSync(dirname(at), { recursive: true })
  const mine = `${process.pid} ${startedAt(process.pid)}`
  const kept = finishedAt(at)
  const arrival: Arrival = {
    root,
    kept,
    before: finishedIn(kept),
    at: Date.now(),
    commit: arrived,
    follows,
  }
  let waiting = false
  let seen: string | null = null
  for (;;) {
    const carried = waiting ? sharedWith(arrival) : null
    if (carried !== null) return { value: carried }
    if (taken(at, mine)) {
      try {
        const late = waiting ? sharedWith(arrival) : null
        if (late !== null) return { value: late }
        if (waiting) onward()
        const took = Date.now()
        const commit = follows ? (commitAt(root, null) ?? arrived) : arrived
        const answer = await act(commit)
        keptFinished(kept, { mark: mine, took, commit, answer })
        return { value: answer }
      } finally {
        if (markIn(at) === mine) {
          try {
            unlinkSync(at)
          } catch {}
        }
      }
    }
    waiting = true
    const mark = markIn(at)
    if (!abandoned(at)) {
      if (mark !== seen && holderOf(mark) !== null) {
        seen = mark
        onward()
      }
      await Bun.sleep(waited)
    } else if (!cleared(at, mark)) {
      return { refused: saidOfNoHold(slug, at) }
    }
  }
}
