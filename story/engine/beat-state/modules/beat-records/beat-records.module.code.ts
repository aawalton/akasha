import {
  type BeatChange,
  changesIn,
  recordIn,
} from "akasha/story/engine/beat-state/modules/beat-changes/beat-changes.module.code.ts"
import {
  type Memory,
  memoryIn,
} from "akasha/story/engine/beat-state/modules/beat-memory/beat-memory.module.code.ts"
import {
  type Pictured,
  picturedIn,
} from "akasha/story/engine/beat-state/modules/beat-pictures/beat-pictures.module.code.ts"
import {
  type BeatScene,
  sceneOf,
} from "akasha/story/engine/beat-state/modules/beat-replay/beat-replay.module.code.ts"

export type Beats = {
  readonly beats: readonly string[]
  readonly scenes: readonly BeatScene[]
  readonly changes: readonly BeatChange[]
  readonly memory: readonly Memory[]
  readonly pictured?: readonly Pictured[]
}

type Refused = { readonly refused: string }

export const NO_BEATS: Beats = { beats: [], scenes: [], changes: [], memory: [] }

const BEAT = "beat"

const EVENT = "event"

const CHANGES = "changes"

const MEMORY = "memory"

const PICTURED = "pictured"

const SCENE_KEYS: readonly string[] = ["at", "place", "present", "arrive", "leave"]

const KNOWN: readonly string[] = [BEAT, EVENT, ...SCENE_KEYS, CHANGES, MEMORY, PICTURED]

const LINES = /\r?\n/

type Entry = Readonly<Record<string, unknown>>

function entriesUnder(beat: number, value: unknown): readonly string[] | string {
  if (value === undefined) return []
  if (!Array.isArray(value)) return `beat ${beat} states a part that is no list`
  const lines: string[] = []
  for (const one of value) {
    if (typeof one !== "object" || one === null || Array.isArray(one)) {
      return `beat ${beat} lists an entry that is no json object`
    }
    if (BEAT in one) return `beat ${beat} lists an entry naming a beat, and its line names it`
    lines.push(JSON.stringify({ [BEAT]: beat, ...one }))
  }
  return lines
}

type Read = {
  readonly beats: string[]
  readonly scenes: BeatScene[]
  readonly changes: string[]
  readonly memory: string[]
  readonly pictured: string[]
}

function lineRead(read: Read, line: string, beat: number): string | null {
  const held = recordIn(line)
  if (held === null) return `beat ${beat} is no json object`
  const unknown = Object.keys(held).find((key) => !KNOWN.includes(key))
  if (unknown !== undefined) {
    return `beat ${beat} states \`${unknown}\`, and a beat states ${KNOWN.join(", ")}`
  }
  if (held[BEAT] !== beat) return `line ${beat} names beat ${String(held[BEAT])}, out of order`
  const event = held[EVENT]
  if (typeof event !== "string" || event.trim() === "") return `beat ${beat} states no \`event\``
  const scene = sceneOf(beat, held)
  if (typeof scene === "string") return scene
  const changes = entriesUnder(beat, held[CHANGES])
  if (typeof changes === "string") return changes
  const memory = entriesUnder(beat, held[MEMORY])
  if (typeof memory === "string") return memory
  const pictured = entriesUnder(beat, held[PICTURED])
  if (typeof pictured === "string") return pictured
  read.beats.push(event.trim())
  if (Object.keys(scene).length > 1) read.scenes.push(scene)
  read.changes.push(...changes)
  read.memory.push(...memory)
  read.pictured.push(...pictured)
  return null
}

export function beatsIn(text: string): Beats | Refused {
  const lines = text
    .split(LINES)
    .map((one) => one.trim())
    .filter((one) => one !== "")
  const read: Read = { beats: [], scenes: [], changes: [], memory: [], pictured: [] }
  for (const [index, line] of lines.entries()) {
    const wrong = lineRead(read, line, index + 1)
    if (wrong !== null) return { refused: wrong }
  }
  const changes = changesIn(read.changes, read.beats.length)
  if ("refused" in changes) return changes
  const memory = memoryIn(read.memory, read.beats.length)
  if ("refused" in memory) return memory
  const pictured = picturedIn(read.pictured, read.beats.length)
  if ("refused" in pictured) return pictured
  const held = { beats: read.beats, scenes: read.scenes, changes, memory }
  return pictured.length === 0 ? held : { ...held, pictured }
}

function moved<Held extends { readonly beat: number }>(
  each: readonly Held[],
  past: number
): readonly Held[] {
  return each.map((one) => ({ ...one, beat: one.beat + past }))
}

export function beatsJoined(each: readonly Beats[]): Beats {
  const beats: string[] = []
  const scenes: BeatScene[] = []
  const changes: BeatChange[] = []
  const memory: Memory[] = []
  const pictured: Pictured[] = []
  for (const one of each) {
    const past = beats.length
    beats.push(...one.beats)
    scenes.push(...moved(one.scenes, past))
    changes.push(...moved(one.changes, past))
    memory.push(...moved(one.memory, past))
    pictured.push(...moved(one.pictured ?? [], past))
  }
  const held = { beats, scenes, changes, memory }
  return pictured.length === 0 ? held : { ...held, pictured }
}

function unbeaten(one: Entry): Entry {
  return Object.fromEntries(Object.entries(one).filter(([key]) => key !== BEAT))
}

export function beatsWritten(held: Beats): string {
  return held.beats
    .map((event, index) => {
      const beat = index + 1
      const scene = held.scenes.find((one) => one.beat === beat)
      const changes = held.changes.filter((one) => one.beat === beat).map(unbeaten)
      const memory = held.memory.filter((one) => one.beat === beat).map(unbeaten)
      const pictured = (held.pictured ?? []).filter((one) => one.beat === beat).map(unbeaten)
      const record = {
        [BEAT]: beat,
        [EVENT]: event,
        ...(scene === undefined ? {} : unbeaten(scene)),
        ...(changes.length === 0 ? {} : { [CHANGES]: changes }),
        ...(memory.length === 0 ? {} : { [MEMORY]: memory }),
        ...(pictured.length === 0 ? {} : { [PICTURED]: pictured }),
      }
      return `${JSON.stringify(record)}\n`
    })
    .join("")
}
