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

const OUT = 1

export function inheritedOut(ppid: number, fd: number = OUT): Opening | null {
  try {
    return statSync(`/proc/${ppid}/fd/${fd}`)
  } catch {
    return null
  }
}

export function discarded(fd: number = OUT): Discard | null {
  try {
    return discardedBy(fstatSync(fd), inheritedOut(process.ppid, fd), statSync("/dev/null"))
  } catch {
    return null
  }
}
