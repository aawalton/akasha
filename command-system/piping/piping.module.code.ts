import { closeSync, constants, openSync, readSync } from "node:fs"
import { whyOf } from "../fault-saying/fault-saying.module.code.ts"

export const MARK_OLD = "<<<<<<< old"

export const MARK_SPLIT = "======="

export const MARK_NEW = ">>>>>>> new"

export const PIPED = "what is piped in"

export const RUNS_SAID = "`<<<<<<<`, `=======` or `>>>>>>>`"

const RUNS = ["<<<<<<<", "=======", ">>>>>>>"]

const INPUT_AT = "/dev/stdin"

const TAKEN_AT_ONCE = 1 << 16

const QUIET_FOR = 5000

const ASKED_AGAIN_IN = 20

const NOT_YET: ReadonlySet<string> = new Set(["EAGAIN", "EWOULDBLOCK"])

const WENT_QUIET =
  `the input went quiet for ${String(QUIET_FOR / 1000)} seconds without ending,` +
  " so what came from it is no whole body"

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

function codeOf(thrown: unknown): string | null {
  if (typeof thrown !== "object" || thrown === null || !("code" in thrown)) return null
  const code = thrown.code
  return typeof code === "string" ? code : null
}

function wholeOf(held: readonly Uint8Array[]): Uint8Array {
  let size = 0
  for (const one of held) size += one.byteLength
  const whole = new Uint8Array(size)
  let at = 0
  for (const one of held) {
    whole.set(one, at)
    at += one.byteLength
  }
  return whole
}

function takenFrom(fd: number): Input {
  const held: Uint8Array[] = []
  const buffer = new Uint8Array(TAKEN_AT_ONCE)
  let quietBy = Date.now() + QUIET_FOR
  for (;;) {
    let read = 0
    try {
      read = readSync(fd, buffer, 0, buffer.length, null)
    } catch (thrown) {
      const code = codeOf(thrown)
      if (code === null || !NOT_YET.has(code)) return { unreadable: whyOf(thrown) }
      if (Date.now() >= quietBy) {
        if (held.length === 0) return { bytes: new Uint8Array() }
        return { unreadable: WENT_QUIET }
      }
      Bun.sleepSync(ASKED_AGAIN_IN)
      continue
    }
    if (read === 0) return { bytes: wholeOf(held) }
    held.push(buffer.slice(0, read))
    quietBy = Date.now() + QUIET_FOR
  }
}

export function inputIn(): Input {
  if (process.stdin.isTTY === true) return { tty: true }
  let fd: number | null = null
  try {
    fd = openSync(INPUT_AT, constants.O_RDONLY | constants.O_NONBLOCK)
    return takenFrom(fd)
  } catch (thrown) {
    return { unreadable: whyOf(thrown) }
  } finally {
    if (fd !== null) closeSync(fd)
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
