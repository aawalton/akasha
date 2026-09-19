import type { Splice } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { placedIn } from "akasha/code/reading/modules/code-specifier/code-specifier.module.code.ts"

const UNDER = "/"

export function nameFor(said: string, was: string, to: string): string | null {
  if (said === was) return to
  if (said.startsWith(`${was}${UNDER}`)) return `${to}${said.slice(was.length)}`
  return null
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
