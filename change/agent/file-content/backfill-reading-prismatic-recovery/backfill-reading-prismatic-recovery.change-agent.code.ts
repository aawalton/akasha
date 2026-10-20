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
import type { CharacterState } from "akasha/temper/player/character/build/modules/build-types/build-types.module.code.ts"
import { loadSetCatalog } from "akasha/temper/player/character/characters-equipment/modules/set-catalog-loading/set-catalog-loading.module.code.ts"
import { buildHash } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { loadSkillCatalog } from "akasha/temper/player/character/skill/modules/skill-catalog-loading/skill-catalog-loading.module.code.ts"
import { resultOf } from "akasha/temper/player/character/stat/modules/build-reading-lines/build-reading-lines.module.code.ts"
import {
  CHARACTERS,
  characterOf,
  READINGS,
  readsBackAs,
} from "akasha/temper/player/character/stat/modules/reading-hash-rewriting/reading-hash-rewriting.module.code.ts"
import { jsonlLinesOf } from "akasha/temper/watcher/modules/watcher-page-landing/watcher-page-landing.module.code.ts"

const JEWELRY = { 1: "necklace", 11: "ring-1", 12: "ring-2" } as const

type JewelrySlot = (typeof JEWELRY)[keyof typeof JEWELRY]

const PRISMATIC = /Magicka Recovery[\s\S]*Health Recovery[\s\S]*Stamina Recovery/

type Json = Record<string, unknown>

type Counts = { lines: number; undecoded: number; unrounded: number }

function prismaticSlotsOf(reading: Json): readonly JewelrySlot[] {
  const worn = reading["worn"]
  const pieces: readonly unknown[] = Array.isArray(worn)
    ? worn
    : isRecord(worn)
      ? Object.values(worn)
      : []
  return pieces.flatMap((one) => {
    if (!isRecord(one)) return []
    const { slot, enchant } = one
    if (typeof slot !== "number" || typeof enchant !== "string") return []
    const jewelry = JEWELRY[slot as keyof typeof JEWELRY] as JewelrySlot | undefined
    return jewelry !== undefined && PRISMATIC.test(enchant) ? [jewelry] : []
  })
}

function unhashedOf(build: CharacterState, slots: readonly JewelrySlot[]): readonly JewelrySlot[] {
  return slots.filter((slot) => {
    const held = build.equipment.jewelry[slot]
    return held.itemType === "jewelry" && held.data.enchantment === "no-enchant"
  })
}

function withPrismatic(build: CharacterState, slots: readonly JewelrySlot[]): CharacterState {
  const jewelry = { ...build.equipment.jewelry }
  for (const slot of slots) {
    const held = jewelry[slot]
    if (held.itemType !== "jewelry") continue
    jewelry[slot] = {
      itemType: "jewelry",
      data: { ...held.data, enchantment: "prismatic-recovery" },
    }
  }
  return { ...build, equipment: { ...build.equipment, jewelry } }
}

function rewritten(text: string, counts: Counts, ids: string[]): string {
  const line = JSON.parse(text) as Json
  const { character, buildHash: hash, bar, reading } = line
  if (typeof character !== "string" || typeof hash !== "string" || typeof bar !== "string")
    return text
  if (!isRecord(reading)) return text
  const slots = prismaticSlotsOf(reading)
  if (slots.length === 0) return text
  const build = decodeBuild(buildHash(hash))
  if (build === null) {
    counts.undecoded += 1
    return text
  }
  const unhashed = unhashedOf(build, slots)
  if (unhashed.length === 0) return text
  const worn = withPrismatic(build, unhashed)
  const written = encodeBuild(worn)
  if (!readsBackAs(written, worn)) {
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

export function backfillReadingPrismaticRecovery(world: World): Answer {
  const paths = world
    .under(CHARACTERS)
    .filter((path) => path.endsWith(READINGS))
    .sort()
  const counts: Counts = { lines: 0, undecoded: 0, unrounded: 0 }
  const edits: FileChange[] = []
  const rewrites: string[] = []
  for (const path of paths) {
    const text = world.textOf(path)
    if (text === null) continue
    const ids: string[] = []
    const lines = jsonlLinesOf(text).map((one) => rewritten(one, counts, ids))
    if (ids.length === 0) continue
    edits.push({ kind: "replace", path, contentFrom: text, contentTo: `${lines.join("\n")}\n` })
    rewrites.push(`${characterOf(path)}: ${String(ids.length)} rewritten: ${ids.join(", ")}`)
  }
  return telling(stating(edits), [
    `${String(counts.lines)} readings' build hashes rewritten with Prismatic Recovery in ${String(edits.length)} readings files`,
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
  return backfillReadingPrismaticRecovery(world)
}
