import type { FileChange } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { textOf } from "akasha/code/body/modules/body-text/body-text.module.code.ts"
import {
  type Locking,
  lockingFor,
  NOTHING_LOCKED,
} from "akasha/code/workspace/modules/manifest-locking/manifest-locking.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"

const MANIFEST = "package.json"

const LOCK = "bun.lock"

function locked(path: string): boolean {
  return path === LOCK || path === MANIFEST || path.endsWith(`/${MANIFEST}`)
}

export function rowsIn(change: Change): readonly FileChange[] {
  const rows: FileChange[] = []
  for (const path of change.changed) {
    if (!locked(path)) continue
    const was = textOf(change.before(path))
    const now = textOf(change.after(path))
    if (was === now) continue
    if (now === null) rows.push({ kind: "remove", path })
    else if (was === null) rows.push({ kind: "add", path, content: now })
    else rows.push({ kind: "replace", path, contentFrom: was, contentTo: now })
  }
  return rows
}

export function couldTurn(change: Change): boolean {
  return change.changed.some(locked)
}

export function generateChange(change: Change): Locking {
  if (change.base === undefined) return NOTHING_LOCKED
  return lockingFor(change.root, change.base, rowsIn(change))
}
