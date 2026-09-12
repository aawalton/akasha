import { readFileSync } from "node:fs"
import { join, sep } from "node:path"
import { gitIn, storeIn, TREES } from "akasha/files/git-place/git-place.module.code.ts"
import { checkoutAt } from "akasha/infrastructure/services/workstations/service-checkout/service-checkout.module.code.ts"
import { RESTART_EXIT } from "akasha/infrastructure/services/workstations/unit-writing/unit-writing.module.code.ts"

const WORKTREES = "worktrees"

const A_HEAD = "HEAD"

const A_REF = "ref: "

export type Moved = {
  readonly from: string
  readonly to: string
}

export function kindOf(at: string, checkout: string): string | null {
  const under = `${storeIn(checkout, TREES)}${sep}`
  if (!at.startsWith(under)) return null
  const named = at.slice(under.length).split(sep)[0]
  return named === undefined || named === "" ? null : named
}

export function headAt(checkout: string, kind: string): string {
  return join(gitIn(checkout), WORKTREES, kind, A_HEAD)
}

export function lineAt(at: string): string | null {
  let held: string
  try {
    held = readFileSync(at, "utf8")
  } catch {
    return null
  }
  const one = held.trim()
  return one === "" ? null : one
}

export function commitAt(at: string, gitDir: string): string | null {
  const one = lineAt(at)
  if (one === null || !one.startsWith(A_REF)) return one
  return lineAt(join(gitDir, one.slice(A_REF.length).trim())) ?? one
}

export function movedFrom(from: string | null, to: string | null): Moved | null {
  if (from === null || to === null || from === to) return null
  return { from, to }
}

export function saidOfMoved(moved: Moved): string {
  return (
    `the tree this code came out of moved from ${moved.from} to ${moved.to}, so this run ends on ` +
    `${RESTART_EXIT} here, where the unit of work before it has landed, for systemd to start it ` +
    "again on the code that tree holds now"
  )
}

const CHECKOUT = checkoutAt()

const KIND = kindOf(import.meta.dir, CHECKOUT)

function commitNow(): string | null {
  return KIND === null ? null : commitAt(headAt(CHECKOUT, KIND), gitIn(CHECKOUT))
}

const STARTED: string | null = commitNow()

export function codeStartedAt(): string | null {
  return STARTED
}

export function codeMoved(): Moved | null {
  return movedFrom(STARTED, commitNow())
}

export function leftWhereCodeMoved(): undefined {
  const moved = codeMoved()
  if (moved === null) return undefined
  console.log(saidOfMoved(moved))
  process.exit(RESTART_EXIT)
}
