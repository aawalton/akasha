import { readFileSync } from "node:fs"
import { constants } from "node:os"
import { join } from "node:path"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import { UNCLASSIFIED } from "akasha/command/modules/answering/command-answering.module.code.ts"
import { valuesByPath } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import {
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { stepBeats } from "akasha/story/chapter/properties/step-beats.text-property.ts"
import { lore } from "akasha/story/lore/lore.page-type.ts"
import { place } from "akasha/story/lore/place/place.page-type.ts"
import { loreFact } from "akasha/story/lore/properties/lore-fact.text-property.ts"
import { loreFacts } from "akasha/story/lore/properties/lore-facts.record-property.ts"
import { loreKnowers } from "akasha/story/lore/properties/lore-knowers.multi-relation-property.ts"
import { loreDisclosure } from "akasha/story/lore-disclosure/lore-disclosure.page-type.ts"
import {
  copiesOf,
  WITHHELD,
  withheldFor,
} from "akasha/story/lore-disclosure/modules/lore-withholding/lore-withholding.module.code.ts"
import { gameMaster } from "akasha/story/lore-disclosure/pages/game-master.lore-disclosure.ts"
import { prose } from "akasha/story/world/stories/played/properties/prose.file-property.ts"
import { turnAction } from "akasha/story/world/stories/played/turns/properties/turn-action.text-property.ts"
import { storyTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.ts"
import { storyChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.ts"

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

const FILE_PATH = /(?:[\w.@~-]+\/)+[\w.@~-]*\.[\p{L}\p{N}]+/gu

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

const TOLD_TO = `${loreDisclosure.slug}/${gameMaster.slug}`

function toldFactOf(one: unknown): string | null {
  if (typeof one !== "object" || one === null) return null
  const knowers: unknown = Reflect.get(one, loreKnowers.propertySlug)
  if (!Array.isArray(knowers) || !knowers.includes(TOLD_TO)) return null
  const fact: unknown = Reflect.get(one, loreFact.propertySlug)
  return typeof fact === "string" ? fact : null
}

function toldProseIn(root: string): readonly string[] {
  const found: string[] = []
  for (const kind of [lore.slug, place.slug]) {
    for (const value of valuesByPath(root, kind).values()) {
      const facts = value[loreFacts.propertySlug]
      if (!Array.isArray(facts)) continue
      for (const one of facts) {
        const fact = toldFactOf(one)
        if (fact !== null) found.push(fact)
      }
    }
  }
  return found
}

function proseOf(root: string, path: string, value: Value): string | null {
  const held = textAt(value, prose.propertySlug)
  const at = held === null ? null : besideAt(path, prose.propertySlug, held)
  return at === null ? null : readFileSync(join(root, at), "utf8")
}

function playedIn(root: string): readonly string[] {
  const found: string[] = []
  for (const kind of [storyTurnPlayed.slug, storyChapterWritten.slug]) {
    for (const [path, value] of valuesByPath(root, kind)) {
      const action = value[turnAction.propertySlug]
      if (typeof action === "string") found.push(action)
      const written = proseOf(root, path, value)
      if (written !== null) found.push(written)
      const beats = value[stepBeats.propertySlug]
      if (!Array.isArray(beats)) continue
      for (const one of beats) if (typeof one === "string") found.push(one)
    }
  }
  return found
}

function toldTaken(runs: Map<number, Set<string>>, told: readonly string[]): undefined {
  for (const one of told) {
    const words = wordsOf(one)
    for (const [length, held] of runs) {
      for (let at = 0; at + length <= words.length; at++) {
        held.delete(words.slice(at, at + length).join(" "))
      }
    }
  }
}

function runsOf(
  tells: readonly string[],
  told: readonly string[]
): ReadonlyMap<number, ReadonlySet<string>> {
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
  toldTaken(runs, told)
  return runs
}

function bodyAt(at: string): string {
  try {
    return readFileSync(at, "utf8")
  } catch (thrown) {
    if (Reflect.get(Object(thrown), "code") === "ENOENT") return ""
    throw thrown
  }
}

export function scrubberFor(root: string, agentId: string | null): Scrubber | null {
  const withheld = withheldFor(root, agentId)
  if (withheld.length === 0) return null
  const tells = copiesOf(root, withheld).flatMap((at) => tellsIn(bodyAt(at)))
  return { runs: runsOf(tells, [...toldProseIn(root), ...playedIn(root)]) }
}

export function heldIn(line: string, scrubber: Scrubber): boolean {
  const words = wordsOf(line.replace(FILE_PATH, " "))
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
