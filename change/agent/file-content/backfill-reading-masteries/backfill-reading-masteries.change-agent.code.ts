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
import { loadSetCatalog } from "akasha/temper/player/character/characters-equipment/modules/set-catalog-loading/set-catalog-loading.module.code.ts"
import { buildHash } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { skillCatalog } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.code.ts"
import { loadSkillCatalog } from "akasha/temper/player/character/skill/modules/skill-catalog-loading/skill-catalog-loading.module.code.ts"
import { resultOf } from "akasha/temper/player/character/stat/modules/build-reading-lines/build-reading-lines.module.code.ts"
import {
  CHARACTERS,
  characterOf,
  READINGS,
  readsBackAs,
} from "akasha/temper/player/character/stat/modules/reading-hash-rewriting/reading-hash-rewriting.module.code.ts"
import { jsonlLinesOf } from "akasha/temper/watcher/modules/watcher-page-landing/watcher-page-landing.module.code.ts"

const CASES = "temper/player/character/stat/temper-stat-case/pages/"

const CASE_STATS = ".temper-stat-case.verified-stats.json"

type Json = Record<string, unknown>

type Outcome = "written" | "already" | "undecoded" | "unrounded"

type Counts = Record<Outcome, number>

function masteriesOf(reading: Json): readonly string[] {
  const passives = reading["classPassives"]
  if (!Array.isArray(passives)) return []
  const held = new Set<unknown>(passives.map((one) => (isRecord(one) ? one["abilityId"] : null)))
  return skillCatalog()
    .classMasteries.list.filter((mastery) => held.has(mastery.esoSkillId))
    .map((mastery) => mastery.id)
}

function rehashed(hash: string, masteries: readonly string[]): [Outcome, string] {
  const build = decodeBuild(buildHash(hash))
  if (build === null) return ["undecoded", hash]
  if ((build.masteries ?? []).join(" ") === masteries.join(" ")) return ["already", hash]
  const chosen = { ...build, masteries }
  const written = encodeBuild(chosen)
  if (!readsBackAs(written, chosen)) return ["unrounded", hash]
  return ["written", written]
}

type Run = {
  readonly counts: Counts
  readonly ids: string[]
  readonly held: Map<string, readonly string[]>
  readonly slug: string
}

function rewritten(text: string, run: Run): string {
  const line = JSON.parse(text) as Json
  const { character, buildHash: hash, bar, reading } = line
  if (typeof character !== "string" || typeof hash !== "string" || typeof bar !== "string")
    return text
  if (!isRecord(reading)) return text
  const masteries = masteriesOf(reading)
  if (masteries.length === 0) return text
  run.held.set(`${run.slug}@${String(reading["capturedAt"])}`, masteries)
  const [outcome, written] = rehashed(hash, masteries)
  run.counts[outcome] += 1
  if (outcome !== "written") return text
  line["buildHash"] = written
  if (typeof line["result"] === "string") {
    line["result"] = resultOf({ character, buildHash: written, bar, reading })
  }
  run.ids.push(String(line["id"] ?? ""))
  return JSON.stringify(line)
}

function rewrittenCase(text: string, held: Map<string, readonly string[]>): string | null {
  const stated = JSON.parse(text) as Json
  const { character, capturedAt, buildHash: hash } = stated
  if (typeof hash !== "string") return null
  const masteries = held.get(`${String(character)}@${String(capturedAt)}`)
  if (masteries === undefined) return null
  const [outcome, written] = rehashed(hash, masteries)
  if (outcome !== "written") return null
  return text.replace(JSON.stringify(hash), JSON.stringify(written))
}

export function backfillReadingMasteries(world: World): Answer {
  const counts: Counts = { written: 0, already: 0, undecoded: 0, unrounded: 0 }
  const held = new Map<string, readonly string[]>()
  const edits: FileChange[] = []
  const rewrites: string[] = []
  const readings = world
    .under(CHARACTERS)
    .filter((path) => path.endsWith(READINGS))
    .sort()
  for (const path of readings) {
    const text = world.textOf(path)
    if (text === null) continue
    const ids: string[] = []
    const run = { counts, ids, held, slug: characterOf(path) }
    const lines = jsonlLinesOf(text).map((one) => rewritten(one, run))
    if (ids.length === 0) continue
    edits.push({ kind: "replace", path, contentFrom: text, contentTo: `${lines.join("\n")}\n` })
    rewrites.push(`${characterOf(path)}: ${String(ids.length)} rewritten: ${ids.join(", ")}`)
  }
  const cases: string[] = []
  const stats = world
    .under(CASES)
    .filter((path) => path.endsWith(CASE_STATS))
    .sort()
  for (const path of stats) {
    const text = world.textOf(path)
    if (text === null) continue
    const written = rewrittenCase(text, held)
    if (written === null) continue
    edits.push({ kind: "replace", path, contentFrom: text, contentTo: written })
    cases.push(path.slice(CASES.length).split("/")[0] ?? path)
  }
  return telling(stating(edits), [
    `${String(counts.written)} readings' build hashes rewritten at minor fourteen with their class masteries`,
    `${String(counts.already)} already holding their class masteries, ${String(counts.undecoded)} whose hash does not decode and ${String(counts.unrounded)} that would not read back, left as they are`,
    `${String(cases.length)} stat cases rewritten with their reading's class masteries${cases.length === 0 ? "" : `: ${cases.join(", ")}`}`,
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
  return backfillReadingMasteries(world)
}
