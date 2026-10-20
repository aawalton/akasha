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
  decodeBuild,
  encodeBuild,
} from "akasha/temper/player/character/build/build-codec/modules/build-codec/build-codec.module.code.ts"
import { base64urlToBytes } from "akasha/temper/player/character/build/build-hash/modules/build-hash-base64url/build-hash-base64url.module.code.ts"
import { loadSetCatalog } from "akasha/temper/player/character/characters-equipment/modules/set-catalog-loading/set-catalog-loading.module.code.ts"
import { buildHash } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { loadSkillCatalog } from "akasha/temper/player/character/skill/modules/skill-catalog-loading/skill-catalog-loading.module.code.ts"
import { resultOf } from "akasha/temper/player/character/stat/modules/build-reading-lines/build-reading-lines.module.code.ts"
import {
  type WornPiece,
  withWornLevels,
  wornLevelsOf,
} from "akasha/temper/player/character/stat/modules/worn-item-levels/worn-item-levels.module.code.ts"
import { jsonlLinesOf } from "akasha/temper/watcher/modules/watcher-page-landing/watcher-page-landing.module.code.ts"

const CHARACTERS = "temper/player/character/temper-account-character/pages/"

const READINGS = ".temper-account-character.readings.jsonl"

const MINOR_AT = 2

const FIRST_MINOR_WITH_GLYPH_LEVEL = 13

const FULL_GLYPH_LEVEL = 50

type Json = Record<string, unknown>

type Counts = { lines: number; newer: number; plain: number; undecoded: number; unrounded: number }

function wornOf(reading: Json): readonly WornPiece[] {
  const worn = reading["worn"]
  const pieces: readonly unknown[] = Array.isArray(worn)
    ? worn
    : isRecord(worn)
      ? Object.values(worn)
      : []
  return pieces.flatMap((one) => {
    if (!isRecord(one)) return []
    const { slot, link, requiredLevel, requiredChampionPoints } = one
    if (typeof slot !== "number" || typeof link !== "string") return []
    return [
      {
        slot,
        link,
        ...(typeof requiredLevel === "number" ? { requiredLevel } : {}),
        ...(typeof requiredChampionPoints === "number" ? { requiredChampionPoints } : {}),
      },
    ]
  })
}

function saysMore(worn: readonly WornPiece[]): boolean {
  return worn.some((piece) => {
    const { level, enchantmentLevel } = wornLevelsOf(piece)
    const below = level !== undefined && level !== "CP160"
    const weaker = enchantmentLevel !== undefined && enchantmentLevel < FULL_GLYPH_LEVEL
    return below || weaker
  })
}

function canonical(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonical)
  if (!isRecord(value)) return value
  const sorted: Json = {}
  for (const key of Object.keys(value).sort()) {
    if (value[key] !== undefined) sorted[key] = canonical(value[key])
  }
  return sorted
}

function rewritten(text: string, counts: Counts, ids: string[]): string {
  const line = JSON.parse(text) as Json
  const { character, buildHash: hash, bar, reading } = line
  if (typeof character !== "string" || typeof hash !== "string" || typeof bar !== "string")
    return text
  if (!isRecord(reading)) return text
  if ((base64urlToBytes(hash)?.[MINOR_AT] ?? 0) >= FIRST_MINOR_WITH_GLYPH_LEVEL) {
    counts.newer += 1
    return text
  }
  const worn = wornOf(reading)
  if (!saysMore(worn)) {
    counts.plain += 1
    return text
  }
  const build = decodeBuild(buildHash(hash))
  if (build === null) {
    counts.undecoded += 1
    return text
  }
  const leveled = withWornLevels(build, worn)
  const written = encodeBuild(leveled)
  if (JSON.stringify(canonical(decodeBuild(written))) !== JSON.stringify(canonical(leveled))) {
    counts.unrounded += 1
    return text
  }
  line["buildHash"] = written
  if (typeof line["result"] === "string") {
    line["result"] = resultOf({ character, buildHash: written, bar, reading })
  }
  counts.lines += 1
  ids.push(String(line["id"] ?? ""))
  return JSON.stringify(line)
}

function characterOf(path: string): string {
  return path.slice(CHARACTERS.length).split("/")[0] ?? path
}

export function backfillReadingLevels(world: World): Answer {
  const paths = world
    .under(CHARACTERS)
    .filter((path) => path.endsWith(READINGS))
    .sort()
  const counts: Counts = { lines: 0, newer: 0, plain: 0, undecoded: 0, unrounded: 0 }
  const edits: FileChange[] = []
  const rewrites: string[] = []
  for (const path of paths) {
    const text = world.textOf(path)
    if (text === null) continue
    const held = jsonlLinesOf(text)
    const ids: string[] = []
    const lines = held.map((one) => rewritten(one, counts, ids))
    if (ids.length === 0) continue
    edits.push({ kind: "replace", path, contentFrom: text, contentTo: `${lines.join("\n")}\n` })
    rewrites.push(`${characterOf(path)}: ${String(ids.length)} rewritten: ${ids.join(", ")}`)
  }
  return telling(stating(edits), [
    `${String(counts.lines)} readings' build hashes rewritten at minor thirteen in ${String(edits.length)} readings files`,
    `${String(counts.newer)} already at minor thirteen, ${String(counts.plain)} wearing only CP160 pieces and glyphs, left as they are`,
    `${String(counts.undecoded)} whose hash does not decode and ${String(counts.unrounded)} that would not read back as worn, left as they are`,
    ...rewrites,
  ])
}

export const takes: readonly string[] = []

export async function runChange(
  world: World,
  given: Readonly<Record<string, string>>
): Promise<Answer> {
  const asked = Object.keys(given)[0]
  if (asked !== undefined) return refusing(`\`${asked}\` is no argument this change takes`)
  await Promise.all([loadSkillCatalog(), loadSetCatalog()])
  return backfillReadingLevels(world)
}
