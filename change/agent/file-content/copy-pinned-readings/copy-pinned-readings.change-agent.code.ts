import {
  type Answer,
  type FileChange,
  refusing,
  stating,
  telling,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import {
  CHARACTERS,
  READINGS,
} from "akasha/temper/player/character/stat/modules/reading-hash-rewriting/reading-hash-rewriting.module.code.ts"
import { jsonlLinesOf } from "akasha/temper/watcher/modules/watcher-page-landing/watcher-page-landing.module.code.ts"

const CASES = "temper/player/character/stat/temper-combat-case/pages/"

const HITS = ".temper-combat-case.verified-hits.json"

const PINNED = ".temper-combat-case.pinned-reading.json"

function textAt(text: string, key: string): string {
  let parsed: unknown
  try {
    parsed = JSON.parse(text)
  } catch {
    return ""
  }
  const value = isRecord(parsed) ? parsed[key] : undefined
  return typeof value === "string" ? value : ""
}

function readingsOf(character: string): string {
  return `${CHARACTERS}${character}/${character}${READINGS}`
}

export function copyPinnedReadings(world: World): Answer {
  const edits: FileChange[] = []
  const copied: string[] = []
  const missed: string[] = []
  const hits = world
    .under(CASES)
    .filter((path) => path.endsWith(HITS))
    .sort()
  for (const path of hits) {
    const text = world.textOf(path)
    if (text === null) continue
    const at = `${path.slice(0, -HITS.length)}${PINNED}`
    if (world.textOf(at) !== null) continue
    const slug = path.slice(CASES.length).split("/")[0] ?? path
    const id = textAt(text, "reading")
    const held = world.textOf(readingsOf(textAt(text, "character")))
    const line = jsonlLinesOf(held).find((one) => textAt(one, "id") === id)
    if (id === "" || line === undefined) {
      missed.push(slug)
      continue
    }
    edits.push({ kind: "add", path: at, content: `${line}\n` })
    copied.push(slug)
  }
  return telling(stating(edits), [
    `${String(copied.length)} combat cases given the reading they were pinned from${copied.length === 0 ? "" : `: ${copied.join(", ")}`}`,
    `${String(missed.length)} combat cases whose reading their character's readings no longer hold${missed.length === 0 ? "" : `: ${missed.join(", ")}`}`,
  ])
}

export const takes: readonly string[] = []

export function runChange(world: World, given: Readonly<Record<string, string>>): Answer {
  const asked = Object.keys(given)[0]
  if (asked !== undefined) return refusing(`\`${asked}\` is no argument this change takes`)
  return copyPinnedReadings(world)
}
