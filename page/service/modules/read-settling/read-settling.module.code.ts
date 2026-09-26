import { existsSync, readFileSync, statSync } from "node:fs"
import { join } from "node:path"
import { keptAt } from "akasha/file/modules/git-place/git-place.module.code.ts"
import { abandoned, LOCK_AT } from "akasha/git/modules/holding/holding.module.code.ts"

const HEAD = "HEAD"

const PACKED = "packed-refs"

const STAGED = "index"

const REF = "ref: "

const WAITED = 5

export const TRIED_AT_MOST = 5

export const WAITED_AT_MOST = 60_000

export type Settled<T> = { readonly settled: T } | { readonly refused: string }

function stampOf(at: string): string {
  const said = statSync(at, { bigint: true, throwIfNoEntry: false })
  return said === undefined ? "" : `${said.ino}:${said.size}:${said.mtimeNs}`
}

function headIn(root: string): string {
  try {
    return readFileSync(join(root, keptAt(HEAD)), "utf8").trim()
  } catch {
    return ""
  }
}

export function landedMark(root: string): string {
  const head = headIn(root)
  const ref = head.startsWith(REF) ? stampOf(join(root, keptAt(head.slice(REF.length)))) : ""
  return [head, ref, stampOf(join(root, keptAt(PACKED))), stampOf(join(root, keptAt(STAGED)))].join(
    "|"
  )
}

export function landingHeld(root: string): boolean {
  const at = join(root, LOCK_AT)
  return existsSync(at) && !abandoned(at)
}

async function unheld(root: string, until: number): Promise<boolean> {
  while (landingHeld(root)) {
    if (Date.now() > until) return false
    await Bun.sleep(WAITED)
  }
  return true
}

export function unsettledSaid(tries: number): string {
  return `a landing changed the checkout while this read was answered, ${tries} times over, so no answer is given rather than one read partway through a landing`
}

export function unheldSaid(waited: number): string {
  return `a landing has held the checkout for longer than ${Math.round(waited / 1000)}s, so no answer is given rather than one read partway through that landing`
}

export async function settledApart<T>(
  root: string,
  act: () => Promise<T>,
  tries: number = TRIED_AT_MOST,
  waited: number = WAITED_AT_MOST
): Promise<Settled<T>> {
  const until = Date.now() + waited
  for (let tried = 0; tried < tries; tried += 1) {
    if (!(await unheld(root, until))) return { refused: unheldSaid(waited) }
    const before = landedMark(root)
    const made = await act()
    if (!landingHeld(root) && landedMark(root) === before) return { settled: made }
  }
  return { refused: unsettledSaid(tries) }
}
