import { basename, dirname, join } from "node:path"
import {
  type Answer,
  type FileChange,
  missing,
  refusing,
  stating,
  telling,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"
import { loadSetCatalog } from "akasha/temper/player/character/characters-equipment/modules/set-catalog-loading/set-catalog-loading.module.code.ts"
import { loadSkillCatalog } from "akasha/temper/player/character/skill/modules/skill-catalog-loading/skill-catalog-loading.module.code.ts"
import { loadMetricCatalog } from "akasha/temper/player/character/stat/modules/metric-catalog-loading/metric-catalog-loading.module.code.ts"
import {
  type Line,
  linesOf,
} from "akasha/temper/player/character/stat/modules/reading-line-picking/reading-line-picking.module.code.ts"
import {
  estimatesOf,
  reproduces,
  sheetStatsOf,
  statCaseShape,
  statCaseText,
  statsInOrder,
} from "akasha/temper/player/character/stat/modules/stat-case/stat-case.module.code.ts"
import { verifiedStats } from "akasha/temper/player/character/stat/temper-stat-case/properties/verified-stats.file-property.ts"
import { temperStatCase } from "akasha/temper/player/character/stat/temper-stat-case/temper-stat-case.page-type.ts"
import { readings } from "akasha/temper/player/character/temper-account-character/properties/readings.file-property.ts"
import { temperAccountCharacter } from "akasha/temper/player/character/temper-account-character/temper-account-character.page-type.ts"
import { z } from "zod"

const STATS = "stats"

const CASES = "cases"

const BAR_KEYS = { "primary-weapon-bar": "frontBar", "backup-weapon-bar": "backBar" } as const

const sheetShape = z.record(
  z.string(),
  z.looseObject({ flat: z.number().optional(), percent: z.number().optional() })
)

type Asked = Readonly<Record<string, string>>

type StatCase = z.infer<typeof statCaseShape>

export type Estimating = (read: Omit<StatCase, "pinned" | "gaps">) => (stat: string) => number

type Unsheeted = "unread" | "sheetless"

type Tally = { added: number; pinned: number; held: number; rowless: number } & Record<
  Unsheeted,
  string[]
>

function everyCase(world: World): readonly string[] | string {
  const typeAt = world.index.listedAt(pageType.slug, temperStatCase.slug)[0]?.path
  if (typeAt === undefined) return `\`${temperStatCase.slug}\` names no page type`
  const ending = `.${temperStatCase.slug}.${verifiedStats.propertySlug}.json`
  return world
    .under(join(dirname(typeAt), "pages"))
    .filter((path) => path.endsWith(ending))
    .map((path) => basename(path).slice(0, -ending.length))
    .sort()
}

function linesFor(world: World, character: string, held: Map<string, readonly Line[]>) {
  const known = held.get(character)
  if (known !== undefined) return known
  const characterAt = world.index.listedAt(temperAccountCharacter.slug, character)[0]?.path
  const readingsAt =
    characterAt === undefined ? null : besideAt(characterAt, readings.propertySlug, "jsonl")
  const text = readingsAt === null ? null : world.textOf(readingsAt)
  const lines = text === null ? [] : linesOf(text)
  held.set(character, lines)
  return lines
}

function sheetOf(statCase: StatCase, lines: readonly Line[]): Record<string, number> | Unsheeted {
  const line = lines.find(
    (one) => one.bar === BAR_KEYS[statCase.bar] && one.reading.capturedAt === statCase.capturedAt
  )
  if (line === undefined) return "unread"
  const sheet = sheetShape.safeParse(line.reading["advancedSheet"])
  return sheet.success ? sheetStatsOf(sheet.data) : "sheetless"
}

type Reach = {
  readonly world: World
  readonly stats: readonly string[]
  readonly estimate: Estimating
  readonly held: Map<string, readonly Line[]>
  readonly tally: Tally
}

function addedIn(slug: string, reach: Reach): FileChange | string | null {
  const { world, stats, estimate, held, tally } = reach
  const pageAt = world.index.listedAt(temperStatCase.slug, slug)[0]?.path
  if (pageAt === undefined) return `\`${slug}\` names no stat case`
  const statsAt = besideAt(pageAt, verifiedStats.propertySlug, "json")
  const text = statsAt === null ? null : world.textOf(statsAt)
  if (statsAt === null || text === null) return `\`${slug}\` holds no verified stats`
  const parsed = statCaseShape.safeParse(JSON.parse(text))
  if (!parsed.success) return `the verified stats of \`${slug}\` do not read`
  const statCase = parsed.data
  if (statCaseText(statCase) !== text) {
    return `the verified stats of \`${slug}\` are not written as a case is written`
  }
  const sheet = sheetOf(statCase, linesFor(world, statCase.character, held))
  if (typeof sheet === "string") {
    tally[sheet].push(slug)
    return null
  }
  const { pinned: wasPinned, gaps: wasGaps, ...read } = statCase
  const pinned = { ...wasPinned }
  const gaps = { ...wasGaps }
  let estimated: ((stat: string) => number) | undefined
  let added = 0
  for (const stat of stats) {
    if (stat in pinned || stat in gaps) {
      tally.held += 1
      continue
    }
    const game = sheet[stat]
    if (game === undefined) {
      tally.rowless += 1
      continue
    }
    estimated ??= estimate(read)
    if (reproduces(stat, estimated(stat), game)) {
      pinned[stat] = game
      tally.pinned += 1
    } else gaps[stat] = game
    added += 1
  }
  if (added === 0) return null
  tally.added += added
  const contentTo = statCaseText({
    ...statCase,
    pinned: statsInOrder(pinned),
    gaps: statsInOrder(gaps),
  })
  return { kind: "replace", path: statsAt, contentFrom: text, contentTo }
}

export function addStatCaseStatsCommand(world: World, given: Asked, estimate: Estimating): Answer {
  const named = given[STATS]
  if (named === undefined) return refusing(missing(STATS))
  const asked = given[CASES]
  const [stats = [], cases = []] = [named, asked ?? ""].map((text) =>
    text
      .split("\n")
      .map((one) => one.trim())
      .filter((one) => one !== "")
  )
  if (stats.length === 0) return refusing(`\`${STATS}\` names no stat`)
  const slugs = asked === undefined ? everyCase(world) : cases
  if (typeof slugs === "string") return refusing(slugs)
  if (slugs.length === 0) return refusing(`\`${CASES}\` names no case`)
  const tally: Tally = { added: 0, pinned: 0, held: 0, rowless: 0, unread: [], sheetless: [] }
  const reach: Reach = { world, stats, estimate, held: new Map(), tally }
  const edits: FileChange[] = []
  for (const slug of slugs) {
    const one = addedIn(slug, reach)
    if (typeof one === "string") return refusing(one)
    if (one !== null) edits.push(one)
  }
  return telling(stating(edits), [
    `${String(tally.added)} stats added to ${String(edits.length)} cases, ${String(tally.pinned)} pinned and ${String(tally.added - tally.pinned)} as gaps`,
    `${String(tally.held)} a case held already and ${String(tally.rowless)} its reading's sheet has no row for, left as they are`,
    `${String(tally.unread.length)} cases whose reading is not found${tally.unread.length === 0 ? "" : `: ${tally.unread.join(", ")}`}`,
    `${String(tally.sheetless.length)} cases whose reading kept no advanced sheet${tally.sheetless.length === 0 ? "" : `: ${tally.sheetless.join(", ")}`}`,
  ])
}

export const takes: readonly string[] = [STATS, CASES]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  await Promise.all([loadSkillCatalog(), loadSetCatalog(), loadMetricCatalog()])
  return addStatCaseStatsCommand(world, given, estimatesOf)
}
