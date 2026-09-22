import { readFileSync } from "node:fs"
import { sep } from "node:path"
import { PINNED_AT } from "akasha/command/pages/deploy/modules/tree-pinning/deploy-tree-pinning.module.code.ts"
import { storeIn, TREES } from "akasha/file/modules/git-place/git-place.module.code.ts"
import { checkoutAt } from "akasha/infrastructure/service/workstation/modules/service-checkout/service-checkout.module.code.ts"
import { RESTART_EXIT } from "akasha/infrastructure/service/workstation/modules/unit-writing/unit-writing.module.code.ts"

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

export function stampAt(checkout: string, kind: string): string {
  return storeIn(checkout, TREES, kind, PINNED_AT)
}

export function commitAt(at: string): string | null {
  let held: string
  try {
    held = readFileSync(at, "utf8")
  } catch {
    return null
  }
  const one = held.trim()
  return one === "" ? null : one
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
  return KIND === null ? null : commitAt(stampAt(CHECKOUT, KIND))
}

const STARTED: string | null = commitNow()

export function codeMoved(): Moved | null {
  return movedFrom(STARTED, commitNow())
}

export function leftWhereCodeMoved(): undefined {
  const moved = codeMoved()
  if (moved === null) return undefined
  console.log(saidOfMoved(moved))
  process.exit(RESTART_EXIT)
}
