import { formattedBody } from "@akasha/code/code-format"
import { tokensOf } from "@akasha/code/code-tokens"
import { textOf } from "../asking/asking.module.code.ts"

export type Interior = {
  readonly start: number
  readonly end: number
}

export type Moved = {
  readonly path: string
  readonly was: Uint8Array | null
  readonly now: Uint8Array | null
}

const CODE = [".ts", ".tsx"]

export function judgedHere(path: string): boolean {
  return CODE.some((one) => path.endsWith(one))
}

export const textIn = textOf

export function interiorsIn(body: string): readonly Interior[] {
  const held = tokensOf(body)
  const found: Interior[] = []
  for (const one of held.strings.values()) found.push({ start: one.start + 1, end: one.end - 1 })
  for (const one of held.templates.values()) {
    for (const quasi of one.quasis) found.push({ start: quasi.start, end: quasi.end })
  }
  return found.sort((one, other) => one.start - other.start)
}

export function spliced(was: string, into: readonly Interior[], said: readonly string[]): string {
  let held = was
  for (let at = into.length - 1; at >= 0; at -= 1) {
    const one = into[at]
    const put = said[at]
    if (one === undefined || put === undefined) continue
    held = held.slice(0, one.start) + put + held.slice(one.end)
  }
  return held
}

function formattedOf(root: string, path: string, body: string): string {
  const done = formattedBody(root, path, new TextEncoder().encode(body))
  return new TextDecoder().decode(done.body)
}

export function movedMoreThanWords(
  root: string,
  path: string,
  was: string,
  now: string
): string | null {
  const mine = interiorsIn(was)
  const theirs = interiorsIn(now)
  if (mine.length !== theirs.length) {
    return (
      `${path} — the body held ${mine.length} runs of stated text before and ${theirs.length} after,` +
      " so this change adds one or takes one away rather than restating one"
    )
  }
  const put = theirs.map((one) => now.slice(one.start, one.end))
  const rebuilt = formattedOf(root, path, spliced(was, mine, put))
  if (rebuilt === formattedOf(root, path, now)) return null
  return (
    `${path} — this change moves more than the words the page states, so it is authored` +
    " rather than restated"
  )
}

export function unrestatedIn(root: string, moved: readonly Moved[]): readonly string[] {
  const said: string[] = []
  for (const one of moved) {
    if (one.now === null) {
      said.push(`${one.path} — a path taken away is no restatement`)
      continue
    }
    if (one.was === null) {
      said.push(`${one.path} — a path that is not there yet is written rather than restated`)
      continue
    }
    if (!judgedHere(one.path)) {
      said.push(`${one.path} — only a TypeScript body is judged a restatement`)
      continue
    }
    const was = textIn(one.was)
    const now = textIn(one.now)
    if (was === null || now === null) {
      said.push(`${one.path} — a body that is not text is no restatement`)
      continue
    }
    const why = movedMoreThanWords(root, one.path, was, now)
    if (why !== null) said.push(why)
  }
  return said
}
