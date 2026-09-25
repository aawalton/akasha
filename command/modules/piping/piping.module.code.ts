import { closeSync, constants, openSync, readSync } from "node:fs"
import { whyOf } from "akasha/command/modules/fault-saying/fault-saying.module.code.ts"

const RUN_OLD = "<<<<<<<"

const RUN_SPLIT = "======="

const RUN_NEW = ">>>>>>>"

export const RUNS_SAID = "`<<<<<<<`, `=======` or `>>>>>>>`"

const RUNS = [RUN_OLD, RUN_SPLIT, RUN_NEW]

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
  | { readonly unreadable: string; readonly part?: true }

export type Piping = () => Input

type Piped =
  | { readonly bytes: Uint8Array }
  | { readonly none: true }
  | { readonly refusals: readonly string[] }

type Wording = {
  readonly bare: (path: string) => string
  readonly opening: (path: string, why: string) => string
}

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
        return { unreadable: WENT_QUIET, part: true }
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
  return body.split("\n").some((one) => markedLine(one))
}
