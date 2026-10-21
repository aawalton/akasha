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
} from "akasha/command/pages/temper/modules/stat-reading-lines/stat-reading-lines.module.code.ts"
import {
  advancedSheetLines,
  cell,
  type SheetRow,
  sheetRowsOf,
  signed,
} from "akasha/command/pages/temper/stat-compare/modules/advanced-sheet-lines/advanced-sheet-lines.module.code.ts"
import {
  caseKeyOf,
  statCasesOf,
} from "akasha/command/pages/temper/stat-compare/modules/reading-stat-case/reading-stat-case.module.code.ts"
import { unsteadyOf } from "akasha/command/pages/temper/stat-compare/modules/unsteady-recovery/unsteady-recovery.module.code.ts"
import { temperStatCompare as page } from "akasha/command/pages/temper/stat-compare/temper-stat-compare.command.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { decodeBuild } from "akasha/temper/player/character/build/build-codec/modules/build-codec/build-codec.module.code.ts"
import type { CharacterState } from "akasha/temper/player/character/build/modules/build-types/build-types.module.code.ts"
import { loadSetCatalog } from "akasha/temper/player/character/characters-equipment/modules/set-catalog-loading/set-catalog-loading.module.code.ts"
import { buildHash } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { loadSkillCatalog } from "akasha/temper/player/character/skill/modules/skill-catalog-loading/skill-catalog-loading.module.code.ts"
import {
  extractSets,
  setPiecesWorn,
} from "akasha/temper/player/character/stat/modules/extract-sets/extract-sets.module.code.ts"
import { isUnsettled } from "akasha/temper/player/character/stat/modules/fete-unsettled/fete-unsettled.module.code.ts"
import { loadMetricCatalog } from "akasha/temper/player/character/stat/modules/metric-catalog-loading/metric-catalog-loading.module.code.ts"
import { isStale } from "akasha/temper/player/character/stat/modules/stale-sheet-rows/stale-sheet-rows.module.code.ts"
import {
  elderDragonHeldOf,
  estimatedOf,
} from "akasha/temper/player/character/stat/modules/stat-case/stat-case.module.code.ts"
import { readings } from "akasha/temper/player/character/temper-account-character/properties/readings.file-property.ts"
import { temperAccountCharacter } from "akasha/temper/player/character/temper-account-character/temper-account-character.page-type.ts"

const NAMED = [character, readingCount, capturedAt, readingId, stat, json]

const BARS = { frontBar: "primary-weapon-bar", backBar: "backup-weapon-bar" } as const

type WeaponBar = (typeof BARS)[keyof typeof BARS]

const FEW_STARS = 4

type Row = {
  readonly stat: string
  readonly game: number
  readonly estimate: number | null
  readonly unsteady: string | null
  readonly unsettled: boolean
}

type Compared = {
  readonly line: ReadingLine
  readonly build: CharacterState | null
  readonly rows: readonly Row[]
  readonly sheetRows: readonly SheetRow[]
  readonly unmatchedBuffs: readonly string[]
  readonly unestimated: string | null
  readonly statCase: string | null
}

function buildOf(hash: string): CharacterState | null {
  try {
    return decodeBuild(buildHash(hash))
  } catch {
    return null
  }
}

function comparedOf(slug: string, line: ReadingLine, statCase: string | null): Compared {
  const { reading } = line
  let estimate: ((one: string) => number) | null = null
  let unmatchedBuffs: readonly string[] = []
  let sources: Parameters<typeof sheetRowsOf>[2] = []
  let unestimated: string | null = null
  try {
    const made = estimatedOf({
      character: line.character,
      bar: BARS[line.bar],
      buildHash: line.buildHash,
      capturedAt: reading.capturedAt,
      esoVersion: reading.esoVersion ?? "",
      inCombat: reading.inCombat,
      ...(reading.ultimate === undefined ? {} : { ultimate: reading.ultimate }),
      ...elderDragonHeldOf(reading),
      activeBuffs: reading.activeBuffs ?? [],
      championPoints: reading.championPoints ?? [],
    })
    estimate = made.estimate
    unmatchedBuffs = made.unmatchedBuffNames
    sources = made.sources
  } catch (thrown) {
    unestimated = saidBy(thrown)
  }
  const build = buildOf(line.buildHash)
  const rows = Object.keys(reading.stats)
    .sort()
    .map((one) => ({
      stat: one,
      game: reading.stats[one] ?? 0,
      estimate: estimate === null ? null : estimate(one),
      unsteady: unsteadyOf(reading, one, build?.passives ?? []),
      unsettled: isUnsettled(one, reading.fete),
    }))
  const buffNames = (reading.activeBuffs ?? []).map((buff) => buff.name)
  const sheetRows = sheetRowsOf(reading, estimate, sources, (one) =>
    isStale(slug, reading.capturedAt, one, buffNames)
  )
  return { line, build, rows, sheetRows, unmatchedBuffs, unestimated, statCase }
}

function whenOf(seconds: number): string {
  return new Date(seconds * 1000).toISOString().replace("T", " ").replace(".000Z", "Z")
}

function combatOf(line: ReadingLine): string {
  return line.reading.inCombat ? "in combat" : "out of combat"
}

type RaceAndClass = Pick<CharacterState["character"], "race" | "class">

function raceAndClassOf(built: RaceAndClass | null): string {
  if (built === null) return "build unread"
  return `${built.race} ${built.class}`
}

export function headerOf(line: ReadingLine, built: RaceAndClass | null): string {
  const { reading } = line
  return [
    shortIdOf(line.id),
    whenOf(reading.capturedAt),
    `capturedAt ${String(reading.capturedAt)}`,
    line.bar,
    raceAndClassOf(built),
    `eso ${reading.esoVersion ?? "unsaid"}`,
    combatOf(line),
  ].join("  ")
}

function setsOn(build: CharacterState, bar: WeaponBar): string {
  const sourced = new Set(
    extractSets(build, { bar }).flatMap((source) =>
      source.categoryId === "sets" && "setId" in source ? [String(source.setId)] : []
    )
  )
  return [...setPiecesWorn(build, { bar })]
    .map(([set, worn]) => {
      const missing = sourced.has(set) ? "" : " not in catalog"
      return `${set} ${String(worn.pieceCount)}${missing}`
    })
    .join(", ")
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
  const buffs = (reading.activeBuffs ?? []).map((buff) => {
    const said = one.unmatchedBuffs.includes(buff.name) ? `${buff.name}?` : buff.name
    const stacks = buff.stacks ?? 0
    return stacks > 1 ? `${said} ×${String(stacks)}` : said
  })
  const unmatched = one.unmatchedBuffs.length > 0 ? "  (? is a buff no buff page names)" : ""
  return [
    `  worn: ${String(reading.worn?.length ?? 0)}${sets === "" ? "" : ` (${sets})`}`,
    `  skills: ${skills}`,
    `  stars: ${String(stars.length)} with ${String(points)} points${few ? `: ${named.join(", ")}` : ""}`,
    `  buffs: ${buffs.join(", ") || "none"}${unmatched}`,
    `  class passives: ${String(reading.classPassives?.length ?? 0)}`,
    ...curseLines(one.build),
    ...(reading.inArchive === true ? ["  in the Infinite Archive"] : []),
    ...(one.statCase === null ? [] : [`  stat case: ${one.statCase}`]),
  ]
}

function unsteadySaid(row: Row): string {
  if (row.unsettled) return "  Fete changed lately, unsettled"
  return row.unsteady === null ? "" : `  ${row.unsteady}, not steady`
}

function isCounted(row: Row): boolean {
  return row.unsteady === null && !row.unsettled
}

export function rowLine(row: Row, width: number): string {
  const estimate = row.estimate === null ? "-" : String(row.estimate)
  const delta = row.estimate === null ? "-" : signed(row.estimate - row.game)
  const mark = !isCounted(row) ? "~" : row.estimate === row.game ? "=" : " "
  return `  ${mark} ${row.stat.padEnd(width)} ${cell(String(row.game))} ${cell(estimate)} ${cell(delta)}${unsteadySaid(row)}`
}

export function characterSheetLines(reading: ReadingLine["reading"]): readonly string[] {
  const sheet = reading.sheet
  if (sheet === undefined) return ["  sheet (game): none kept"]
  const entries = Object.entries(sheet).sort(([one], [two]) => one.localeCompare(two))
  const width = Math.max(4, ...entries.map(([name]) => name.length))
  return [
    "  sheet (game)",
    ...entries.map(([name, value]) => `    ${name.padEnd(width)} ${cell(String(value))}`),
  ]
}

function blockOf(one: Compared): readonly string[] {
  const width = Math.max(4, ...one.rows.map((row) => row.stat.length))
  const steady = one.rows.filter(isCounted)
  const matched = steady.filter((row) => row.estimate === row.game).length
  const unsettled = one.rows.filter((row) => row.unsettled).length
  const unsettledSaid = unsettled === 0 ? "" : `, ${String(unsettled)} unsettled by Fete`
  const head = `    ${"stat".padEnd(width)} ${cell("game")} ${cell("temper")} ${cell("diff")}`
  return [
    headerOf(one.line, one.build?.character ?? null),
    ...configuredLines(one),
    ...(one.unestimated === null ? [] : [`  no estimate: ${one.unestimated}`]),
    head,
    ...one.rows.map((row) => rowLine(row, width)),
    `  ${String(matched)} of ${String(steady.length)} steady stats match${unsettledSaid}`,
    ...advancedSheetLines(one.line.reading, one.sheetRows),
    ...characterSheetLines(one.line.reading),
    "",
  ]
}

function statLine(one: Compared, row: Row | undefined): string {
  const lead = [shortIdOf(one.line.id), whenOf(one.line.reading.capturedAt), one.line.bar]
  const said = [...lead, combatOf(one.line)].join("  ")
  if (row === undefined) return `${said}  not reported`
  if (row.estimate === null) return `${said}  game ${String(row.game)}  no estimate`
  const mark = isCounted(row) && row.estimate === row.game ? "  =" : ""
  return `${said}  game ${String(row.game)}  temper ${String(row.estimate)}  ${signed(row.estimate - row.game)}${mark}${unsteadySaid(row)}`
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
  const cases = statCasesOf(given.root, slug)
  const compared = chosen.chosen.map((line) =>
    comparedOf(slug, line, cases.get(caseKeyOf(BARS[line.bar], line.reading.capturedAt)) ?? null)
  )

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
        statCase: one.statCase,
        stats: one.rows,
        advancedSheet: one.line.reading.advancedSheet ?? null,
        advancedStats: one.sheetRows,
        sheet: one.line.reading.sheet ?? null,
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
