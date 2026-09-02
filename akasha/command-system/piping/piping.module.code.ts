import { readFileSync } from "node:fs"
import { whyOf } from "../fault-saying/fault-saying.module.code.ts"

export const MARK_OLD = "<<<<<<< old"

export const MARK_SPLIT = "======="

export const MARK_NEW = ">>>>>>> new"

export const PIPED = "what is piped in"

export const RUNS_SAID = "`<<<<<<<`, `=======` or `>>>>>>>`"

const RUNS = ["<<<<<<<", "=======", ">>>>>>>"]

export type Input =
  | { readonly bytes: Uint8Array }
  | { readonly tty: true }
  | { readonly unreadable: string }

export type Piping = () => Input

export type Piped =
  | { readonly bytes: Uint8Array }
  | { readonly none: true }
  | { readonly refusals: readonly string[] }

export type Wording = {
  readonly bare: (path: string) => string
  readonly opening: (path: string, why: string) => string
}

export type Passage = {
  readonly old: string
  readonly put: string
}

export type Passages =
  | { readonly passages: readonly Passage[] }
  | { readonly refusals: readonly string[] }

export function inputIn(): Input {
  if (process.stdin.isTTY === true) return { tty: true }
  try {
    return { bytes: readFileSync(0) }
  } catch (thrown) {
    return { unreadable: whyOf(thrown) }
  }
}

export function pipedIn(piping: Piping, wanted: string | null, saying: Wording): Piped {
  if (wanted === null) return { none: true }
  const held = piping()
  if ("tty" in held) return { refusals: [saying.bare(wanted)] }
  if ("unreadable" in held) return { refusals: [saying.opening(wanted, held.unreadable)] }
  if (held.bytes.byteLength === 0) return { refusals: [saying.bare(wanted)] }
  return { bytes: held.bytes }
}

export function markedLine(said: string): boolean {
  return RUNS.some((one) => said.startsWith(one))
}

export function markingIn(body: string): boolean {
  return body.split("\n").some(markedLine)
}

function linedOf(said: string): readonly string[] {
  const held: string[] = []
  let from = 0
  while (from < said.length) {
    const at = said.indexOf("\n", from)
    if (at === -1) {
      held.push(said.slice(from))
      break
    }
    held.push(said.slice(from, at + 1))
    from = at + 1
  }
  return held
}

function closedBy(opened: number, closes: string): Passages {
  return {
    refusals: [`the block opened at line ${opened} of ${PIPED} is closed by no \`${closes}\``],
  }
}

function marking(at: number, instead: string): string {
  return (
    `line ${at} of ${PIPED} begins with ${RUNS_SAID} inside a passage` +
    ` — hand a passage like that in at ${instead}`
  )
}

export function passagesIn(said: string, instead: string): Passages {
  const passages: Passage[] = []
  let old: string[] | null = null
  let put: string[] | null = null
  let opened = 0
  for (const [which, line] of linedOf(said).entries()) {
    const at = which + 1
    const one = line.endsWith("\n") ? line.slice(0, -1) : line
    if (old === null) {
      if (one === MARK_OLD) {
        old = []
        opened = at
        continue
      }
      if (markedLine(one)) {
        return { refusals: [`\`${one}\` at line ${at} of ${PIPED} follows no \`${MARK_OLD}\``] }
      }
      return {
        refusals: [
          `line ${at} of ${PIPED} sits outside every marker block, and every line belongs to one`,
        ],
      }
    }
    if (put === null) {
      if (one === MARK_SPLIT) {
        put = []
        continue
      }
      if (one === MARK_NEW) return closedBy(opened, MARK_SPLIT)
      if (markedLine(one)) return { refusals: [marking(at, instead)] }
      old.push(line)
      continue
    }
    if (one === MARK_NEW) {
      passages.push({ old: old.join(""), put: put.join("") })
      old = null
      put = null
      continue
    }
    if (one === MARK_OLD) return closedBy(opened, MARK_NEW)
    if (markedLine(one)) return { refusals: [marking(at, instead)] }
    put.push(line)
  }
  if (old !== null) return closedBy(opened, put === null ? MARK_SPLIT : MARK_NEW)
  if (passages.length === 0) {
    return { refusals: [`${PIPED} names no \`${MARK_OLD}\`, so it asks for no substitution`] }
  }
  return { passages }
}
