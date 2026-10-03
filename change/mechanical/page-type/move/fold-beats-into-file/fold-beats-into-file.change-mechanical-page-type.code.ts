import {
  type FileChange,
  refusing,
  type Said,
  type Splice,
  splicedIn,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { literalIn } from "akasha/change/modules/page-literal/page-literal.module.code.ts"
import {
  placeOf,
  splicesIn,
  type Written,
} from "akasha/change/modules/page-property-splicing/page-property-splicing.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { changesIn } from "akasha/story/engine/beat-state/modules/beat-changes/beat-changes.module.code.ts"
import { memoryIn } from "akasha/story/engine/beat-state/modules/beat-memory/beat-memory.module.code.ts"
import { beatsWritten } from "akasha/story/engine/beat-state/modules/beat-records/beat-records.module.code.ts"
import { scenesIn } from "akasha/story/engine/beat-state/modules/beat-replay/beat-replay.module.code.ts"

export type Asked = {
  readonly pageType: string
  readonly atMost?: number | null
}

type Value = Readonly<Record<string, unknown>>

const BEATS = "beats"

const SCENES = "beatScenes"

const CHANGES = "beatChanges"

const MEMORY = "beatMemory"

const CHANGES_SLUG = "beat-changes"

const MEMORY_SLUG = "beat-memory"

const HELD = "jsonl"

const MOST = Number.MAX_SAFE_INTEGER

const LINES = /\r?\n/

const FOLDED = [SCENES, CHANGES, MEMORY]

type Beside = { readonly at: string; readonly lines: readonly string[] } | null

function besideRead(world: World, path: string, value: Value, key: string, slug: string) {
  const ending = value[key]
  if (ending === undefined) return null
  const at = typeof ending === "string" ? besideAt(path, slug, ending) : null
  if (at === null) return `\`${path}\` states \`${key}\` as no file beside it`
  const text = world.textOf(at)
  if (text === null) return `\`${path}\` states \`${key}\`, and \`${at}\` could not be read`
  const lines = text
    .split(LINES)
    .map((one) => one.trim())
    .filter((one) => one !== "")
  return { at, lines }
}

function pageEdits(world: World, path: string, inline: boolean, filed: boolean) {
  const text = world.textOf(path)
  if (text === null) return `\`${path}\` could not be read`
  const source = parsedAs(path, text)
  const owner = literalIn(source)
  if (owner === null) return `\`${path}\` exports no object`
  const dropped = [...FOLDED, ...(inline && !filed ? [BEATS] : [])]
  const written: Written[] = dropped.map((key) => ({ written: "dropped", key }))
  const spots = splicesIn(text, source, owner, written)
  if (typeof spots === "string") return `\`${path}\` is refused, and ${spots}`
  const held = owner.properties[placeOf(owner, BEATS)]
  if (!filed || held === undefined) return splicedIn(path, text, spots)
  const put: Splice = { from: held.getStart(source), to: held.getEnd(), put: `${BEATS}: "${HELD}"` }
  return splicedIn(path, text, [...spots, put])
}

function besidesOf(world: World, path: string, value: Value): readonly [Beside, Beside] | string {
  const changed = besideRead(world, path, value, CHANGES, CHANGES_SLUG)
  if (typeof changed === "string") return changed
  const remembered = besideRead(world, path, value, MEMORY, MEMORY_SLUG)
  if (typeof remembered === "string") return remembered
  return [changed, remembered]
}

export function foldedAt(world: World, path: string, value: Value): readonly FileChange[] | string {
  const beats = value[BEATS]
  const inline = Array.isArray(beats)
  if (!inline && FOLDED.every((key) => value[key] === undefined)) return []
  if (!inline && beats !== undefined) {
    return `\`${path}\` states \`${BEATS}\` as a file already and holds a key left to fold`
  }
  const besides = besidesOf(world, path, value)
  if (typeof besides === "string") return besides
  const [changed, remembered] = besides
  const changes = changesIn(changed?.lines ?? [], MOST)
  if ("refused" in changes) return `\`${path}\`: ${changes.refused}`
  const memory = memoryIn(remembered?.lines ?? [], MOST)
  if ("refused" in memory) return `\`${path}\`: ${memory.refused}`
  const events = inline ? beats.filter((one): one is string => typeof one === "string") : []
  const filed = events.length > 0
  const edits = pageEdits(world, path, inline, filed)
  if (typeof edits === "string") return edits
  const file = besideAt(path, BEATS, HELD)
  const scenes = scenesIn(value[SCENES])
  const body = beatsWritten({ beats: events, scenes, changes, memory })
  const adding: FileChange[] =
    filed && file !== null ? [{ kind: "add", path: file, content: body }] : []
  const gone = [changed, remembered].flatMap((one): FileChange[] =>
    one === null ? [] : [{ kind: "remove", path: one.at }]
  )
  return [...edits, ...adding, ...gone]
}

export function foldBeatsIntoFile(world: World, given: Asked): Said {
  if (world.index.propertiesIfNamed(given.pageType) === null) {
    return refusing(`\`${given.pageType}\` names no page type`)
  }
  const atMost = given.atMost ?? null
  const edits: FileChange[] = []
  let folded = 0
  for (const kind of world.index.kindsUnder(given.pageType)) {
    for (const [path, value] of world.index.valuesByPath(kind)) {
      if (atMost !== null && folded >= atMost) return stating(edits)
      const made = foldedAt(world, path, value)
      if (typeof made === "string") return refusing(made)
      if (made.length === 0) continue
      folded += 1
      edits.push(...made)
    }
  }
  return stating(edits)
}

export function runChange(world: World, given: Asked): Said {
  return foldBeatsIntoFile(world, given)
}
