import {
  type Answer,
  type FileChange,
  missing,
  refusing,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { bodyAt } from "akasha/git/modules/commit-reading/commit-reading.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import {
  captureKeyOf,
  resultOf,
} from "akasha/temper/player/character/stat/modules/build-reading-lines/build-reading-lines.module.code.ts"
import { readings } from "akasha/temper/player/character/temper-account-character/properties/readings.file-property.ts"
import { removedReadings } from "akasha/temper/player/character/temper-account-character/properties/removed-readings.file-property.ts"
import { temperAccountCharacter } from "akasha/temper/player/character/temper-account-character/temper-account-character.page-type.ts"
import { z } from "zod"

const CHARACTER = "character"

const READING = "reading"

const FROM = "from"

const BAR = "bar"

const CAPTURED_AT = "captured-at"

const BACK_FROM = "back-from"

const BARS = ["frontBar", "backBar"]

const LINES = "jsonl"

type Removal = { readonly id: string; readonly bar: string; readonly capturedAt: number }

type Recorded = readonly FileChange[] | { readonly refused: string }

function pageKeyOf(propertySlug: string): string {
  const key = propertySlug.replace(/-([a-z0-9])/g, (_, one: string) => one.toUpperCase())
  return `  ${key}: "${LINES}",\n`
}

function captureOfLine(text: string): string | null {
  const parsed = z
    .looseObject({ bar: z.string(), capturedAt: z.number() })
    .safeParse(JSON.parse(text))
  return parsed.success ? captureKeyOf(parsed.data.bar, parsed.data.capturedAt) : null
}

function removalRecorded(world: World, characterAt: string, removal: Removal): Recorded {
  const removedAt = besideAt(characterAt, removedReadings.propertySlug, LINES)
  if (removedAt === null) return { refused: `\`${characterAt}\` names no removed readings path` }
  const line = `${JSON.stringify(removal)}\n`
  const removed = world.textOf(removedAt)
  if (removed !== null) {
    const capture = captureKeyOf(removal.bar, removal.capturedAt)
    const lines = removed.split("\n").filter((one) => one.trim() !== "")
    if (lines.some((one) => captureOfLine(one) === capture)) return []
    return [{ kind: "append", path: removedAt, content: line }]
  }
  const added: FileChange[] = [{ kind: "add", path: removedAt, content: line }]
  const page = world.textOf(characterAt)
  const stated = pageKeyOf(removedReadings.propertySlug)
  if (page === null || page.includes(stated)) return added
  const anchor = pageKeyOf(readings.propertySlug)
  if (!page.includes(anchor)) {
    return {
      refused: `\`${characterAt}\` states no readings for the removed readings to sit after`,
    }
  }
  return [
    ...added,
    { kind: "replace", path: characterAt, contentFrom: anchor, contentTo: `${anchor}${stated}` },
  ]
}

function capturedAtOf(line: Line): number | null {
  const at = line.reading.capturedAt
  return typeof at === "number" ? at : null
}

const lineShape = z.looseObject({
  id: z.string(),
  result: z.string(),
  character: z.string(),
  buildHash: z.string(),
  bar: z.string(),
  reading: z.record(z.string(), z.unknown()),
})

type Line = z.infer<typeof lineShape>

type Held = { readonly text: string; readonly line: Line }

type Asked = Readonly<Record<string, string>>

function heldOf(text: string): readonly Held[] {
  const held: Held[] = []
  for (const one of text.split("\n")) {
    if (one.trim() === "") continue
    const parsed = lineShape.safeParse(JSON.parse(one))
    if (parsed.success) held.push({ text: one, line: parsed.data })
  }
  return held
}

function picked(
  held: readonly Held[],
  pick: string,
  character: string
): Held | { readonly refused: string } {
  const matching = held.filter((one) => one.line.id.startsWith(pick))
  if (matching.length === 1 && matching[0] !== undefined) return matching[0]
  if (matching.length === 0) return { refused: `\`${character}\` holds no reading \`${pick}\`` }
  return {
    refused: `\`${pick}\` names ${String(matching.length)} readings of \`${character}\`, and a pick names one`,
  }
}

export type ReadAt = (root: string, ref: string, path: string) => string | null

function textAt(root: string, ref: string, path: string): string | null {
  const bytes = bodyAt(root, ref, path)
  return bytes === null ? null : new TextDecoder().decode(bytes)
}

const recordShape = z.looseObject({ id: z.string() })

function recordIdOf(text: string): string | null {
  const parsed = recordShape.safeParse(JSON.parse(text))
  return parsed.success ? parsed.data.id : null
}

function recordDropped(world: World, characterAt: string, id: string): readonly FileChange[] {
  const removedAt = besideAt(characterAt, removedReadings.propertySlug, LINES)
  const removed = removedAt === null ? null : world.textOf(removedAt)
  if (removedAt === null || removed === null) return []
  const lines = removed.split("\n").filter((one) => one.trim() !== "")
  const record = lines.find((one) => recordIdOf(one) === id)
  if (record === undefined) return []
  if (lines.length > 1) {
    return [{ kind: "replace", path: removedAt, contentFrom: `${record}\n`, contentTo: "" }]
  }
  const gone: FileChange[] = [{ kind: "remove", path: removedAt }]
  const page = world.textOf(characterAt)
  const stated = pageKeyOf(removedReadings.propertySlug)
  if (page === null || !page.includes(stated)) return gone
  return [...gone, { kind: "replace", path: characterAt, contentFrom: stated, contentTo: "" }]
}

type Putting = {
  readonly characterAt: string
  readonly readingsAt: string
  readonly held: readonly Held[]
  readonly pick: string
  readonly character: string
  readonly ref: string
}

function putBack(world: World, putting: Putting, readAt: ReadAt): Answer {
  const { characterAt, readingsAt, held, pick, character, ref } = putting
  const was = readAt(world.root, ref, readingsAt)
  if (was === null) return refusing(`\`${ref}\` holds no readings of \`${character}\``)
  const before = heldOf(was)
  const one = picked(before, pick, character)
  if ("refused" in one) return refusing(one.refused)
  const now = new Set(held.map((other) => other.line.id))
  if (now.has(one.line.id)) return refusing(`\`${one.line.id}\` is held already`)
  const place = before.indexOf(one)
  const next = before.slice(place + 1).find((other) => now.has(other.line.id))
  const after =
    next === undefined ? undefined : held.find((other) => other.line.id === next.line.id)
  const put: FileChange =
    after === undefined
      ? { kind: "append", path: readingsAt, content: `${one.text}\n` }
      : {
          kind: "replace",
          path: readingsAt,
          contentFrom: `${after.text}\n`,
          contentTo: `${one.text}\n${after.text}\n`,
        }
  return stating([put, ...recordDropped(world, characterAt, one.line.id)])
}

export function repairReadingLineCommand(
  world: World,
  given: Asked,
  readAt: ReadAt = textAt
): Answer {
  const character = given[CHARACTER]
  if (character === undefined) return refusing(missing(CHARACTER))
  const pick = given[READING]
  if (pick === undefined) return refusing(missing(READING))
  const characterAt = world.index.listedAt(temperAccountCharacter.slug, character)[0]?.path
  if (characterAt === undefined) return refusing(`\`${character}\` names no character page`)
  const readingsAt = besideAt(characterAt, readings.propertySlug, "jsonl")
  const text = readingsAt === null ? null : world.textOf(readingsAt)
  if (readingsAt === null || text === null) {
    return refusing(`\`${character}\` holds no readings to repair`)
  }
  const held = heldOf(text)
  const ref = given[BACK_FROM]
  if (ref !== undefined) {
    return putBack(world, { characterAt, readingsAt, held, pick, character, ref }, readAt)
  }
  const gone = given[CAPTURED_AT]
  if (gone !== undefined) return goneRecorded(world, characterAt, held, pick, given[BAR], gone)
  const one = picked(held, pick, character)
  if ("refused" in one) return refusing(one.refused)
  const source = given[FROM]
  if (source === undefined) {
    const capturedAt = capturedAtOf(one.line)
    if (capturedAt === null) return refusing(`\`${pick}\` records no instant it was captured`)
    const removal = { id: one.line.id, bar: one.line.bar, capturedAt }
    const recorded = removalRecorded(world, characterAt, removal)
    if ("refused" in recorded) return refusing(recorded.refused)
    return stating([
      { kind: "replace", path: readingsAt, contentFrom: `${one.text}\n`, contentTo: "" },
      ...recorded,
    ])
  }
  const from = picked(held, source, character)
  if ("refused" in from) return refusing(from.refused)
  if (from.line.bar !== one.line.bar) {
    return refusing(`\`${source}\` reads the ${from.line.bar} and \`${pick}\` the ${one.line.bar}`)
  }
  const buildHash = from.line.buildHash
  if (buildHash === one.line.buildHash) {
    return refusing(`\`${pick}\` carries the build hash of \`${source}\` already`)
  }
  const result = resultOf({ ...one.line, buildHash })
  const holder = held.find((other) => other.line.result === result)
  if (holder !== undefined) {
    return refusing(
      `\`${pick}\` under the build hash of \`${source}\` repeats \`${holder.line.id}\`, and a result lands once`
    )
  }
  const repaired = JSON.stringify({ ...one.line, result, buildHash })
  return stating([
    { kind: "replace", path: readingsAt, contentFrom: `${one.text}\n`, contentTo: `${repaired}\n` },
  ])
}

function goneRecorded(
  world: World,
  characterAt: string,
  held: readonly Held[],
  id: string,
  bar: string | undefined,
  gone: string
): Answer {
  if (bar === undefined || !BARS.includes(bar)) {
    return refusing(`a capture already taken out is named by \`${BAR}\`: one of ${BARS.join(", ")}`)
  }
  const capturedAt = Number(gone)
  if (!Number.isInteger(capturedAt))
    return refusing(`\`${gone}\` is no instant a capture was taken`)
  const capture = captureKeyOf(bar, capturedAt)
  const holder = held.find((one) => captureKeyOf(one.line.bar, capturedAtOf(one.line)) === capture)
  if (holder !== undefined) {
    return refusing(`\`${holder.line.id}\` holds that capture still, so take that line out instead`)
  }
  const recorded = removalRecorded(world, characterAt, { id, bar, capturedAt })
  if ("refused" in recorded) return refusing(recorded.refused)
  if (recorded.length === 0) return refusing(`the ${bar} capture at ${gone} is recorded already`)
  return stating(recorded)
}

export const takes: readonly string[] = [CHARACTER, READING, FROM, BAR, CAPTURED_AT, BACK_FROM]

export function runChange(world: World, given: Asked): Promise<Answer> {
  return Promise.resolve(repairReadingLineCommand(world, given))
}
