import { readFileSync } from "node:fs"
import { constants } from "node:os"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import { UNCLASSIFIED } from "akasha/command/modules/answering/command-answering.module.code.ts"
import {
  copiesOf,
  WITHHELD,
  withheldFor,
} from "akasha/story/lore-disclosure/modules/lore-withholding/lore-withholding.module.code.ts"

export const LEFT_OUT = "[a line of lore the world builder holds was left out here]"

export const SCRUBBED_BY = "AKASHA_LORE_SCRUBBED_BY"

export type Scrubber = {
  readonly runs: ReadonlyMap<number, ReadonlySet<string>>
}

export type Sinks = {
  readonly out: (text: string) => void
  readonly err: (text: string) => void
}

type Stream = {
  readonly chunk: (text: string) => void
  readonly end: () => number
}

const RUN = 5

const LEAST = 16

const LITERAL = /"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`/g

const ESCAPED = /\\(.)/g

const LAID_OUT = /\\[nrt]/g

const SPACED = /\s/

const APART = /[^\p{L}\p{N}]+/u

const NEWLINE = "\n"

const SIGNALS: readonly NodeJS.Signals[] = ["SIGINT", "SIGTERM", "SIGHUP"]

function unquoted(literal: string): string {
  return literal.slice(1, -1).replace(ESCAPED, (_whole, one: string) => one)
}

export function tellsIn(body: string): readonly string[] {
  const found = (body.match(LITERAL) ?? [])
    .map(unquoted)
    .filter((one) => SPACED.test(one) && one.length >= LEAST)
  return [...new Set(found)]
}

function wordsOf(text: string): readonly string[] {
  return text
    .replace(LAID_OUT, " ")
    .toLowerCase()
    .split(APART)
    .filter((one) => one !== "")
}

function runsOf(tells: readonly string[]): ReadonlyMap<number, ReadonlySet<string>> {
  const runs = new Map<number, Set<string>>()
  const add = (words: readonly string[]): undefined => {
    const held = runs.get(words.length) ?? new Set<string>()
    held.add(words.join(" "))
    runs.set(words.length, held)
  }
  for (const tell of tells) {
    const words = wordsOf(tell)
    if (words.length < RUN) {
      if (words.length > 1) add(words)
      continue
    }
    for (let at = 0; at + RUN <= words.length; at++) add(words.slice(at, at + RUN))
  }
  return runs
}

export function scrubberFor(root: string, agentId: string | null): Scrubber | null {
  const withheld = withheldFor(root, agentId)
  if (withheld.length === 0) return null
  const tells = copiesOf(root, withheld).flatMap((at) => tellsIn(readFileSync(at, "utf8")))
  return { runs: runsOf(tells) }
}

export function heldIn(line: string, scrubber: Scrubber): boolean {
  const words = wordsOf(line)
  for (const [length, held] of scrubber.runs) {
    for (let at = 0; at + length <= words.length; at++) {
      if (held.has(words.slice(at, at + length).join(" "))) return true
    }
  }
  return false
}

export function scrubbing(scrubber: Scrubber, write: (text: string) => void): Stream {
  let pending = ""
  let held = 0
  const shown = (line: string): string => {
    if (!heldIn(line, scrubber)) return line
    held += 1
    return LEFT_OUT
  }
  return {
    chunk: (text) => {
      const lines = `${pending}${text}`.split(NEWLINE)
      pending = lines.pop() ?? ""
      if (lines.length > 0) write(lines.map((one) => `${shown(one)}${NEWLINE}`).join(""))
    },
    end: () => {
      if (pending !== "") write(shown(pending))
      pending = ""
      return held
    },
  }
}

export function heldNotice(held: number): string {
  const one = held === 1
  return [
    `${held} line${one ? "" : "s"} this call printed ${one ? "carries" : "carry"} lore the world ` +
      `builder holds, so ${one ? "it was" : "they were"} left out and the rest follows.`,
    "",
    ...WITHHELD,
  ].join(NEWLINE)
}

export function scrubbedAbove(
  env: Readonly<Record<string, string | undefined>>,
  parent: number
): boolean {
  return env[SCRUBBED_BY] === String(parent)
}

function codeOf(code: number | null, signal: NodeJS.Signals | null): number {
  if (code !== null) return code
  return 128 + (signal === null ? 0 : constants.signals[signal])
}

async function poured(from: ReadableStream<Uint8Array>, into: Stream): Promise<undefined> {
  const text = new TextDecoder()
  for await (const bytes of from) into.chunk(text.decode(bytes, { stream: true }))
  into.chunk(text.decode())
}

export async function scrubbedRun(
  program: readonly string[],
  scrubber: Scrubber,
  sinks: Sinks
): Promise<number> {
  const env = { ...process.env, [SCRUBBED_BY]: String(process.pid) }
  let child: Bun.Subprocess<"inherit", "pipe", "pipe">
  try {
    child = Bun.spawn([...program], { stdin: "inherit", stdout: "pipe", stderr: "pipe", env })
  } catch (thrown) {
    sinks.err(`akasha: the call could not be started under the scrubber — ${saidBy(thrown)}\n`)
    return UNCLASSIFIED
  }
  const passed = (signal: NodeJS.Signals): undefined => {
    child.kill(signal)
  }
  for (const one of SIGNALS) process.on(one, passed)
  try {
    const out = scrubbing(scrubber, sinks.out)
    const err = scrubbing(scrubber, sinks.err)
    await Promise.all([poured(child.stdout, out), poured(child.stderr, err)])
    await child.exited
    const held = out.end() + err.end()
    if (held > 0) sinks.err(`${heldNotice(held)}${NEWLINE}`)
    return codeOf(child.exitCode, child.signalCode)
  } finally {
    for (const one of SIGNALS) process.off(one, passed)
  }
}
