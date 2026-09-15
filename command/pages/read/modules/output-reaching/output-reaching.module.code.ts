import { fstatSync, statSync } from "node:fs"

export type Discard = "/dev/null" | "a pipe" | "a file only this redirect opened"

export type Opening = {
  readonly dev: number
  readonly ino: number
  readonly isFIFO: () => boolean
  readonly isFile: () => boolean
}

function same(one: Opening, other: Opening): boolean {
  return one.dev === other.dev && one.ino === other.ino
}

export function discardedBy(
  out: Opening,
  inherited: Opening | null,
  nowhere: Opening
): Discard | null {
  if (same(out, nowhere)) return "/dev/null"
  if (out.isFIFO()) return "a pipe"
  if (!out.isFile()) return null
  if (inherited === null) return null
  return same(out, inherited) ? null : "a file only this redirect opened"
}

export function inheritedOut(ppid: number): Opening | null {
  try {
    return statSync(`/proc/${ppid}/fd/1`)
  } catch {
    return null
  }
}

export function discarded(): Discard | null {
  try {
    return discardedBy(fstatSync(1), inheritedOut(process.ppid), statSync("/dev/null"))
  } catch {
    return null
  }
}
