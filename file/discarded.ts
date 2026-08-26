
import { type Stats, fstatSync, statSync } from "node:fs"

export type Discard = "/dev/null" | "a pipe" | "a file only this redirect opened"

function same(one: Stats, other: Stats): boolean {
  return one.dev === other.dev && one.ino === other.ino
}

export function discarded(): Discard | null {
  try {
    const nowhere = statSync("/dev/null")
    const out = fstatSync(1)
    if (same(out, nowhere)) return "/dev/null"
    if (out.isFIFO()) return "a pipe"
    if (!out.isFile()) return null
    const said = fstatSync(2)
    return said.isFile() && same(out, said) ? null : "a file only this redirect opened"
  } catch {
    return null
  }
}
