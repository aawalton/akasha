import { said as gitSaid } from "../../../git/running/git-running.module.code.ts"
import type { Kind } from "../calling/calling.module.code.ts"

export type Running = {
  readonly checks: boolean
  readonly writerOwesReading: boolean
  readonly readersOweReading: boolean
}

const AUTHORED: Running = { checks: true, writerOwesReading: true, readersOweReading: true }

export function runningOf(kind: Kind | undefined): Running {
  if (kind === undefined) return AUTHORED
  const { runsChecks, writerOwesReading, readersOweReading } = kind
  return { checks: runsChecks, writerOwesReading, readersOweReading }
}

export type Body = {
  readonly was: Uint8Array | null
  readonly body: Uint8Array | null
  readonly readersOweReading?: boolean
}

export type Bodies = ReadonlyMap<string, Body>

export function owedOf(held: Bodies): ReadonlyMap<string, boolean> {
  const owed = new Map<string, boolean>()
  for (const [path, one] of held) {
    if (one.readersOweReading === undefined) continue
    owed.set(path, one.readersOweReading)
  }
  return owed
}

export function headOf(root: string): string {
  return gitSaid(root, ["rev-parse", "HEAD"]).trim()
}
