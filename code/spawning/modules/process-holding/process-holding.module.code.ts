import { accessSync, constants, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  budgetAt,
  MOUNT,
  ownAt,
  RUN,
  swept,
  throttled,
} from "akasha/code/spawning/modules/running/running.module.code.ts"

const PROCS = "cgroup.procs"

function movedTo(at: string): boolean {
  try {
    writeFileSync(join(at, PROCS), String(process.pid))
    return true
  } catch {
    return false
  }
}

function takesBack(at: string): boolean {
  try {
    accessSync(join(at, PROCS), constants.W_OK)
    return true
  } catch {
    return false
  }
}

const freely = (): undefined => undefined

export function heldHere(megabytes: number): () => undefined {
  const own = ownAt()
  if (own === null) return freely
  const home = join(MOUNT, own)
  if (!takesBack(home)) return freely
  const at = budgetAt()
  if (at === null) return freely
  const leaf = join(at, RUN)
  throttled(leaf, megabytes)
  if (!movedTo(leaf)) {
    swept(at)
    return freely
  }
  return () => {
    movedTo(home)
    swept(at)
  }
}
