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
  type BeatScene,
  sceneOf,
} from "akasha/story/engine/beat-state/modules/beat-replay/beat-replay.module.code.ts"

export type Beats = {
  readonly beats: readonly string[]
  readonly scenes: readonly BeatScene[]
  readonly changes: readonly BeatChange[]
  readonly memory: readonly Memory[]
}

type Refused = { readonly refused: string }

export const NO_BEATS: Beats = { beats: [], scenes: [], changes: [], memory: [] }

const BEAT = "beat"

const EVENT = "event"

const CHANGES = "changes"

const MEMORY = "memory"

const SCENE_KEYS: readonly string[] = ["at", "place", "present", "arrive", "leave"]

const KNOWN: readonly string[] = [BEAT, EVENT, ...SCENE_KEYS, CHANGES, MEMORY]

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
  read.beats.push(event.trim())
  if (Object.keys(scene).length > 1) read.scenes.push(scene)
  read.changes.push(...changes)
  read.memory.push(...memory)
  return null
}

export function beatsIn(text: string): Beats | Refused {
  const lines = text
    .split(LINES)
    .map((one) => one.trim())
    .filter((one) => one !== "")
  const read: Read = { beats: [], scenes: [], changes: [], memory: [] }
  for (const [index, line] of lines.entries()) {
    const wrong = lineRead(read, line, index + 1)
    if (wrong !== null) return { refused: wrong }
  }
  const changes = changesIn(read.changes, read.beats.length)
  if ("refused" in changes) return changes
  const memory = memoryIn(read.memory, read.beats.length)
  if ("refused" in memory) return memory
  return { beats: read.beats, scenes: read.scenes, changes, memory }
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
      const record = {
        [BEAT]: beat,
        [EVENT]: event,
        ...(scene === undefined ? {} : unbeaten(scene)),
        ...(changes.length === 0 ? {} : { [CHANGES]: changes }),
        ...(memory.length === 0 ? {} : { [MEMORY]: memory }),
      }
      return `${JSON.stringify(record)}\n`
    })
    .join("")
}
