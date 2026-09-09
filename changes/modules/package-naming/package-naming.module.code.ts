import { placedIn } from "@akasha/code/code-specifier"
import type { Splice } from "../answer/change-answer.module.types.ts"

const UNDER = "/"

const AFTER = ":"

const OVER = "@"

type Aliased = { readonly opening: string; readonly named: string; readonly range: string }

export function nameFor(said: string, was: string, to: string): string | null {
  if (said === was) return to
  if (said.startsWith(`${was}${UNDER}`)) return `${to}${said.slice(was.length)}`
  return null
}

export function aliasIn(said: string): Aliased | null {
  const at = said.indexOf(AFTER)
  if (at < 0) return null
  const held = said.slice(at + 1)
  const last = held.lastIndexOf(OVER)
  if (last <= 0) return null
  return {
    opening: said.slice(0, at + 1),
    named: held.slice(0, last),
    range: held.slice(last),
  }
}

export function spelledAnew(at: string, text: string, was: string, to: string): readonly Splice[] {
  const found: Splice[] = []
  for (const one of placedIn(at, text)) {
    const next = nameFor(one.text, was, to)
    if (next === null) continue
    found.push({ from: one.start, to: one.end, put: JSON.stringify(next) })
  }
  return found
}

export function spelledByNaming(
  at: string,
  text: string,
  naming: ReadonlyMap<string, string>
): readonly Splice[] {
  const found: Splice[] = []
  for (const one of placedIn(at, text)) {
    const next = naming.get(one.text)
    if (next === undefined) continue
    found.push({ from: one.start, to: one.end, put: JSON.stringify(next) })
  }
  return found
}
