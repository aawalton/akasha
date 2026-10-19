import { readFileSync } from "node:fs"
import { join } from "node:path"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { capturedAt } from "akasha/command/argument/pages/captured-at.argument.ts"
import { character } from "akasha/command/argument/pages/character.argument.ts"
import { json } from "akasha/command/argument/pages/json.argument.ts"
import { readingCount } from "akasha/command/argument/pages/reading-count.argument.ts"
import { readingId } from "akasha/command/argument/pages/reading-id.argument.ts"
import { stat } from "akasha/command/argument/pages/stat.argument.ts"
import {
  asJson,
  DATA,
  INPUT,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import {
  chosenIn,
  type ReadingLine,
  readingLinesIn,
  shortIdOf,
  type Unread,
} from "akasha/command/pages/temper/stat-compare/modules/stat-reading-lines/stat-reading-lines.module.code.ts"
import { temperStatCompare as page } from "akasha/command/pages/temper/stat-compare/temper-stat-compare.command.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { decodeBuild } from "akasha/temper/player/character/build/build-codec/modules/build-codec/build-codec.module.code.ts"
import type { CharacterState } from "akasha/temper/player/character/build/modules/build-types/build-types.module.code.ts"
import { loadSetCatalog } from "akasha/temper/player/character/characters-equipment/modules/set-catalog-loading/set-catalog-loading.module.code.ts"
import { buildHash } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { loadSkillCatalog } from "akasha/temper/player/character/skill/modules/skill-catalog-loading/skill-catalog-loading.module.code.ts"
import { loadMetricCatalog } from "akasha/temper/player/character/stat/modules/metric-catalog-loading/metric-catalog-loading.module.code.ts"
import { estimatedOf } from "akasha/temper/player/character/stat/modules/stat-case/stat-case.module.code.ts"
import { readings } from "akasha/temper/player/character/temper-account-character/properties/readings.file-property.ts"
import { temperAccountCharacter } from "akasha/temper/player/character/temper-account-character/temper-account-character.page-type.ts"

const NAMED = [character, readingCount, capturedAt, readingId, stat, json]

const BARS = { frontBar: "primary-weapon-bar", backBar: "backup-weapon-bar" } as const

type WeaponBar = (typeof BARS)[keyof typeof BARS]

const FEW_STARS = 4

const NUMBER = 8

type Row = { readonly stat: string; readonly game: number; readonly estimate: number | null }

type Compared = {
  readonly line: ReadingLine
  readonly build: CharacterState | null
  readonly rows: readonly Row[]
  readonly unmatchedBuffs: readonly string[]
  readonly unestimated: string | null
}

function buildOf(hash: string): CharacterState | null {
  try {
    return decodeBuild(buildHash(hash))
  } catch {
    return null
  }
}

function comparedOf(line: ReadingLine): Compared {
  const { reading } = line
  let estimate: ((one: string) => number) | null = null
  let unmatchedBuffs: readonly string[] = []
  let unestimated: string | null = null
  try {
    const made = estimatedOf({
      character: line.character,
      bar: BARS[line.bar],
      buildHash: line.buildHash,
      capturedAt: reading.capturedAt,
      esoVersion: reading.esoVersion ?? "",
      inCombat: reading.inCombat,
      activeBuffs: reading.activeBuffs ?? [],
      championPoints: reading.championPoints ?? [],
    })
    estimate = made.estimate
    unmatchedBuffs = made.unmatchedBuffNames
  } catch (thrown) {
    unestimated = saidBy(thrown)
  }
  const rows = Object.keys(reading.stats)
    .sort()
    .map((one) => ({
      stat: one,
      game: reading.stats[one] ?? 0,
      estimate: estimate === null ? null : estimate(one),
    }))
  return { line, build: buildOf(line.buildHash), rows, unmatchedBuffs, unestimated }
}

function signed(delta: number): string {
  return delta > 0 ? `+${String(delta)}` : String(delta)
}

function whenOf(seconds: number): string {
  return new Date(seconds * 1000).toISOString().replace("T", " ").replace(".000Z", "Z")
}

function combatOf(line: ReadingLine): string {
  return line.reading.inCombat ? "in combat" : "out of combat"
}

function headerOf(line: ReadingLine): string {
  const { reading } = line
  return [
    shortIdOf(line.id),
    whenOf(reading.capturedAt),
    `capturedAt ${String(reading.capturedAt)}`,
    line.bar,
    `eso ${reading.esoVersion ?? "unsaid"}`,
    combatOf(line),
  ].join("  ")
}

function setsOn(build: CharacterState, bar: WeaponBar): string {
  const { equipment } = build
  const items = [
    ...Object.values(equipment.armor),
    ...Object.values(equipment.jewelry),
    equipment[bar]["main-hand"],
    equipment[bar]["off-hand"],
  ]
  const counts = new Map<string, number>()
  for (const one of items) {
    if (one.data === null) continue
    const set = String(one.data.set)
    if (set === "" || set.startsWith("no-")) continue
    counts.set(set, (counts.get(set) ?? 0) + 1)
  }
  return [...counts].map(([set, many]) => `${set} ${String(many)}`).join(", ")
}

function curseLines(build: CharacterState | null): readonly string[] {
  if (build === null) return []
  const { curseState, vampireStage } = build.character
  const stage = curseState.includes("vampire") ? `, ${vampireStage}` : ""
  return [`  curse: ${curseState}${stage}`]
}

function configuredLines(one: Compared): readonly string[] {
  const { reading } = one.line
  const sets = one.build === null ? "" : setsOn(one.build, BARS[one.line.bar])
  const skills = reading.skills?.map((skill) => skill.name).join(", ") || "none kept"
  const stars = (reading.championPoints ?? []).filter((star) => star.points > 0)
  const points = stars.reduce((sum, star) => sum + star.points, 0)
  const few = stars.length > 0 && stars.length <= FEW_STARS
  const named = stars.map((star) => `${String(star.championSkillId)}:${String(star.points)}`)
  const buffs = (reading.activeBuffs ?? []).map((buff) =>
    one.unmatchedBuffs.includes(buff.name) ? `${buff.name}?` : buff.name
  )
  const unmatched = one.unmatchedBuffs.length > 0 ? "  (? is a buff no buff page names)" : ""
  return [
    `  worn: ${String(reading.worn?.length ?? 0)}${sets === "" ? "" : ` (${sets})`}`,
    `  skills: ${skills}`,
    `  stars: ${String(stars.length)} with ${String(points)} points${few ? `: ${named.join(", ")}` : ""}`,
    `  buffs: ${buffs.join(", ") || "none"}${unmatched}`,
    `  class passives: ${String(reading.classPassives?.length ?? 0)}`,
    ...curseLines(one.build),
    ...(reading.inArchive === true ? ["  in the Infinite Archive"] : []),
  ]
}

function cell(text: string): string {
  return text.padStart(NUMBER)
}

function rowLine(row: Row, width: number): string {
  const estimate = row.estimate === null ? "-" : String(row.estimate)
  const delta = row.estimate === null ? "-" : signed(row.estimate - row.game)
  const mark = row.estimate === row.game ? "=" : " "
  return `  ${mark} ${row.stat.padEnd(width)} ${cell(String(row.game))} ${cell(estimate)} ${cell(delta)}`
}

function blockOf(one: Compared): readonly string[] {
  const width = Math.max(4, ...one.rows.map((row) => row.stat.length))
  const matched = one.rows.filter((row) => row.estimate === row.game).length
  const head = `    ${"stat".padEnd(width)} ${cell("game")} ${cell("temper")} ${cell("diff")}`
  return [
    headerOf(one.line),
    ...configuredLines(one),
    ...(one.unestimated === null ? [] : [`  no estimate: ${one.unestimated}`]),
    head,
    ...one.rows.map((row) => rowLine(row, width)),
    `  ${String(matched)} of ${String(one.rows.length)} match`,
    "",
  ]
}

function statLine(one: Compared, row: Row | undefined): string {
  const lead = [shortIdOf(one.line.id), whenOf(one.line.reading.capturedAt), one.line.bar]
  const said = [...lead, combatOf(one.line)].join("  ")
  if (row === undefined) return `${said}  not reported`
  if (row.estimate === null) return `${said}  game ${String(row.game)}  no estimate`
  const mark = row.estimate === row.game ? "  =" : ""
  return `${said}  game ${String(row.game)}  temper ${String(row.estimate)}  ${signed(row.estimate - row.game)}${mark}`
}

function unreadLines(unread: readonly Unread[]): readonly string[] {
  const first = unread[0]
  if (first === undefined) return []
  return [
    `${String(unread.length)} lines of the readings do not read; line ${String(first.line)}: ${first.why}`,
  ]
}

export async function temperStatCompare(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const slug = read.taken.character
  const found = listedAt(given.root, temperAccountCharacter.slug, slug)[0]
  if (found === undefined) return refused(`\`${slug}\` names no character page`, INPUT)
  const at = besideAt(found.path, readings.propertySlug, "jsonl")
  if (at === null) return refused(`\`${slug}\` sits where no readings file can`, DATA)
  let body: string
  try {
    body = readFileSync(join(given.root, at), "utf8")
  } catch (thrown) {
    return refused(`\`${slug}\` holds no readings: ${saidBy(thrown)}`, DATA)
  }
  const { lines, unread } = readingLinesIn(body)
  const chosen = chosenIn(lines, {
    last: read.taken.readingCount,
    capturedAt: read.taken.capturedAt,
    id: read.taken.readingId,
  })
  if ("refused" in chosen) return refused(`\`${slug}\`: ${chosen.refused}`, INPUT)

  await Promise.all([loadSkillCatalog(), loadSetCatalog(), loadMetricCatalog()])
  const compared = chosen.chosen.map(comparedOf)

  if (read.taken.json) {
    return asJson({
      character: slug,
      readings: compared.map((one) => ({
        id: one.line.id,
        capturedAt: one.line.reading.capturedAt,
        bar: one.line.bar,
        esoVersion: one.line.reading.esoVersion ?? null,
        inCombat: one.line.reading.inCombat,
        unmatchedBuffs: one.unmatchedBuffs,
        unestimated: one.unestimated,
        stats: one.rows,
      })),
      unread,
    })
  }
  const named = read.taken.stat
  if (named !== undefined) {
    const known = new Set(compared.flatMap((one) => one.rows.map((row) => row.stat)))
    if (!known.has(named)) {
      return refused(
        `\`${named}\` is no stat these readings report; they report ${[...known].sort().join(", ")}`,
        INPUT
      )
    }
    const rows = compared.map((one) =>
      statLine(
        one,
        one.rows.find((row) => row.stat === named)
      )
    )
    return told([named, ...rows, ...unreadLines(unread)])
  }
  return told([...compared.flatMap(blockOf), ...unreadLines(unread)])
}
