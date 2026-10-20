import {
  type Answer,
  type FileChange,
  refusing,
  stating,
  telling,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { resultOf } from "akasha/temper/player/character/stat/modules/build-reading-lines/build-reading-lines.module.code.ts"
import { jsonlLinesOf } from "akasha/temper/watcher/modules/watcher-page-landing/watcher-page-landing.module.code.ts"

const CHARACTERS = "temper/player/character/temper-account-character/pages/"

const READINGS = ".temper-account-character.readings.jsonl"

const STARS = "temper/catalog/champion-point/temper-champion-star/pages/"

const STAR = ".temper-champion-star.ts"

const STAR_ID = /^\s*esoChampionSkillId: (\d+),$/m

const SLOTTABLE = /^\s*isSlottable: true,$/m

type Json = Record<string, unknown>

type Counts = {
  files: number
  lines: number
  archiveTrue: number
  archiveKept: number
  archiveRemoved: number
  starsReset: number
  starsUncatalogued: number
}

function isRecord(value: unknown): value is Json {
  return value !== null && typeof value === "object" && !Array.isArray(value)
}

function listed(value: unknown): readonly unknown[] {
  return value !== null && typeof value === "object" ? Object.values(value) : []
}

function slottableOf(world: World): ReadonlyMap<number, boolean> {
  const slottable = new Map<number, boolean>()
  for (const path of world.under(STARS)) {
    if (!path.endsWith(STAR)) continue
    const text = world.textOf(path) ?? ""
    const id = STAR_ID.exec(text)?.[1]
    if (id !== undefined) slottable.set(Number(id), SLOTTABLE.test(text))
  }
  return slottable
}

function abilityIdOf(one: unknown): number | null {
  return isRecord(one) && typeof one["abilityId"] === "number" ? one["abilityId"] : null
}

function boonsOf(reading: Json): readonly unknown[] {
  return listed(reading["archiveBoons"])
}

function archiveShown(reading: Json, boonIds: ReadonlySet<number>): boolean {
  if (boonsOf(reading).length > 0) return true
  return listed(reading["activeBuffs"]).some((buff) => boonIds.has(abilityIdOf(buff) ?? -1))
}

function starsReset(
  reading: Json,
  slottable: ReadonlyMap<number, boolean>,
  counts: Counts
): undefined {
  for (const star of listed(reading["championPoints"])) {
    if (!isRecord(star) || typeof star["slottable"] !== "boolean") continue
    const id = star["championSkillId"]
    const catalogued = typeof id === "number" ? slottable.get(id) : undefined
    if (catalogued === undefined) counts.starsUncatalogued += 1
    else if (star["slottable"] !== catalogued) {
      star["slottable"] = catalogued
      counts.starsReset += 1
    }
  }
  return undefined
}

function correctedLine(
  text: string,
  slottable: ReadonlyMap<number, boolean>,
  boonIds: ReadonlySet<number>,
  counts: Counts
): string {
  const line = JSON.parse(text) as Json
  const before = JSON.stringify(line)
  const reading = line["reading"]
  if (!isRecord(reading)) return text
  if (reading["inArchive"] === true) {
    counts.archiveTrue += 1
    if (archiveShown(reading, boonIds)) counts.archiveKept += 1
    else {
      delete reading["inArchive"]
      counts.archiveRemoved += 1
    }
  }
  starsReset(reading, slottable, counts)
  const said = JSON.stringify(line)
  if (said === before) return text
  const { character, buildHash, bar } = line
  if (typeof character !== "string" || typeof buildHash !== "string" || typeof bar !== "string")
    return said
  if (typeof line["result"] !== "string") return said
  line["result"] = resultOf({ character, buildHash, bar, reading })
  return JSON.stringify(line)
}

function boonIdsIn(world: World, paths: readonly string[]): ReadonlySet<number> {
  const ids = new Set<number>()
  for (const path of paths) {
    for (const text of jsonlLinesOf(world.textOf(path))) {
      const reading = (JSON.parse(text) as Json)["reading"]
      if (!isRecord(reading)) continue
      for (const boon of boonsOf(reading)) {
        const id = abilityIdOf(boon)
        if (id !== null) ids.add(id)
      }
    }
  }
  return ids
}

function repeatsIn(lines: readonly string[]): readonly string[] {
  const seen = new Map<string, unknown>()
  const repeats: string[] = []
  for (const text of lines) {
    const line = JSON.parse(text) as Json
    const result = line["result"]
    if (typeof result !== "string") continue
    const first = seen.get(result)
    if (first === undefined) seen.set(result, line["id"])
    else repeats.push(`${String(first)} and ${String(line["id"])}`)
  }
  return repeats
}

export function correctReadingBooleansCommand(world: World): Answer {
  const slottable = slottableOf(world)
  if (slottable.size === 0) return refusing(`no champion star under \`${STARS}\` states its number`)
  const paths = world
    .under(CHARACTERS)
    .filter((path) => path.endsWith(READINGS))
    .sort()
  const boonIds = boonIdsIn(world, paths)
  const counts: Counts = {
    files: 0,
    lines: 0,
    archiveTrue: 0,
    archiveKept: 0,
    archiveRemoved: 0,
    starsReset: 0,
    starsUncatalogued: 0,
  }
  const edits: FileChange[] = []
  const repeats: string[] = []
  for (const path of paths) {
    const text = world.textOf(path)
    if (text === null) continue
    const held = jsonlLinesOf(text)
    const corrected = held.map((one) => correctedLine(one, slottable, boonIds, counts))
    const changed = corrected.filter((one, at) => one !== held[at]).length
    if (changed === 0) continue
    repeats.push(...repeatsIn(corrected))
    counts.files += 1
    counts.lines += changed
    edits.push({ kind: "replace", path, contentFrom: text, contentTo: `${corrected.join("\n")}\n` })
  }
  if (repeats.length > 0) {
    return refusing(
      `${String(repeats.length)} pairs of readings would hold one result, and a result lands once: ${repeats.join(", ")}`
    )
  }
  return telling(stating(edits), [
    `${String(counts.lines)} lines changed in ${String(counts.files)} readings files`,
    `inArchive true in ${String(counts.archiveTrue)} readings: ${String(counts.archiveRemoved)} taken out, ${String(counts.archiveKept)} kept on Archive evidence`,
    `slottable set from the catalog on ${String(counts.starsReset)} stars, ${String(counts.starsUncatalogued)} stars the catalog lacks left as read`,
  ])
}

export const takes: readonly string[] = []

export function runChange(world: World, given: Readonly<Record<string, string>>): Promise<Answer> {
  const asked = Object.keys(given)[0]
  if (asked !== undefined)
    return Promise.resolve(refusing(`\`${asked}\` is no argument this change takes`))
  return Promise.resolve(correctReadingBooleansCommand(world))
}
