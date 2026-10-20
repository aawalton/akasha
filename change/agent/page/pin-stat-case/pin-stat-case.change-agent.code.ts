import { dirname, join } from "node:path"
import { akasha } from "akasha/akasha.domain.ts"
import {
  type Answer,
  missing,
  refusing,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"
import { loadSetCatalog } from "akasha/temper/player/character/characters-equipment/modules/set-catalog-loading/set-catalog-loading.module.code.ts"
import { loadSkillCatalog } from "akasha/temper/player/character/skill/modules/skill-catalog-loading/skill-catalog-loading.module.code.ts"
import { isUnsettled } from "akasha/temper/player/character/stat/modules/fete-unsettled/fete-unsettled.module.code.ts"
import { loadMetricCatalog } from "akasha/temper/player/character/stat/modules/metric-catalog-loading/metric-catalog-loading.module.code.ts"
import {
  pinnedCaseOf,
  sheetStatsOf,
  statCaseText,
} from "akasha/temper/player/character/stat/modules/stat-case/stat-case.module.code.ts"
import { verifiedStats } from "akasha/temper/player/character/stat/temper-stat-case/properties/verified-stats.file-property.ts"
import { temperStatCase } from "akasha/temper/player/character/stat/temper-stat-case/temper-stat-case.page-type.ts"
import { readings } from "akasha/temper/player/character/temper-account-character/properties/readings.file-property.ts"
import { temperAccountCharacter } from "akasha/temper/player/character/temper-account-character/temper-account-character.page-type.ts"
import { reportedStatsReadingSchema } from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"
import { z } from "zod"

const CHARACTER = "character"

const READING = "reading"

const BAR = "bar"

const SLUG = "slug"

const BARS = {
  frontBar: { named: "front", bar: "primary-weapon-bar" },
  backBar: { named: "back", bar: "backup-weapon-bar" },
} as const

const BAR_KEYS = { front: "frontBar", back: "backBar" } as const

const lineShape = z.object({
  id: z.string(),
  buildHash: z.string(),
  bar: z.enum(["frontBar", "backBar"]),
  reading: z.looseObject({ capturedAt: z.number() }),
})

type Line = z.infer<typeof lineShape>

type Asked = Readonly<Record<string, string>>

type Pin = typeof pinnedCaseOf

function stampOf(capturedAt: number): string {
  const iso = new Date(capturedAt * 1000).toISOString()
  return `${iso.slice(0, 10)}-${iso.slice(11, 13)}${iso.slice(14, 16)}`
}

function pageFor(slug: string, title: string, typesAt: string): string {
  return [
    `import type { TemperStatCase } from "${akasha.slug}/${typesAt}"`,
    "",
    `export const ${slug.replace(/-([a-z0-9])/g, (_, one: string) => one.toUpperCase())} = {`,
    `  type: "page-type/${temperStatCase.slug}",`,
    `  slug: "${slug}",`,
    `  title: ${JSON.stringify(title)},`,
    `  ${verifiedStats.propertySlug.replace(/-([a-z])/g, (_, one: string) => one.toUpperCase())}: "json",`,
    "} as const satisfies TemperStatCase",
    "",
  ].join("\n")
}

function linesOf(text: string): readonly Line[] {
  const lines: Line[] = []
  for (const one of text.split("\n")) {
    if (one.trim() === "") continue
    const parsed = lineShape.safeParse(JSON.parse(one))
    if (parsed.success) lines.push(parsed.data)
  }
  return lines
}

function isPicked(line: Line, pick: string): boolean {
  return String(line.reading.capturedAt) === pick || line.id.startsWith(pick)
}

function newestOf(lines: readonly Line[]): Line | undefined {
  return lines.reduce<Line | undefined>(
    (newest, one) =>
      newest === undefined || one.reading.capturedAt > newest.reading.capturedAt ? one : newest,
    undefined
  )
}

function settledOf(
  stats: Record<string, number>,
  fete: Parameters<typeof isUnsettled>[1]
): Record<string, number> {
  return Object.fromEntries(Object.entries(stats).filter(([stat]) => !isUnsettled(stat, fete)))
}

export function pinStatCaseCommand(world: World, given: Asked, pin: Pin): Answer {
  const character = given[CHARACTER]
  if (character === undefined) return refusing(missing(CHARACTER))
  const pick = given[READING]
  const barNamed = given[BAR]
  if (pick === undefined && barNamed === undefined) return refusing(missing(BAR))
  if (barNamed !== undefined && barNamed !== "front" && barNamed !== "back") {
    return refusing(`\`${barNamed}\` is no bar, and a bar is \`front\` or \`back\``)
  }
  const barKey = barNamed === undefined ? undefined : BAR_KEYS[barNamed]
  const characterAt = world.index.listedAt(temperAccountCharacter.slug, character)[0]?.path
  if (characterAt === undefined) return refusing(`\`${character}\` names no character page`)
  const readingsAt = besideAt(characterAt, readings.propertySlug, "jsonl")
  const text = readingsAt === null ? null : world.textOf(readingsAt)
  if (text === null) return refusing(`\`${character}\` holds no readings to pin from`)
  const matching = linesOf(text).filter(
    (one) =>
      (barKey === undefined || one.bar === barKey) && (pick === undefined || isPicked(one, pick))
  )
  if (pick !== undefined && matching.length > 1) {
    return refusing(
      `\`${pick}\` names ${String(matching.length)} readings of \`${character}\`, and a pick names one`
    )
  }
  const line = newestOf(matching)
  const asked = [
    pick === undefined ? null : `\`${pick}\``,
    barNamed === undefined ? null : `on the ${barNamed} bar`,
  ]
  if (line === undefined) {
    return refusing(
      `\`${character}\` holds no reading ${asked.filter((one) => one !== null).join(" ")}`
    )
  }
  const read = reportedStatsReadingSchema.safeParse(line.reading)
  if (!read.success) return refusing(`the reading \`${line.id}\` of \`${character}\` does not read`)
  const reading = read.data
  const { esoVersion } = reading
  if (esoVersion === undefined) {
    return refusing(`the reading \`${line.id}\` of \`${character}\` records no game version`)
  }
  const { named, bar } = BARS[line.bar]
  const { buildHash } = line
  const slug = given[SLUG] ?? `${character}-${named}-bar-${stampOf(reading.capturedAt)}`
  const there = world.index.listedAt(temperStatCase.slug, slug)[0]
  if (there !== undefined) return refusing(`\`${slug}\` is a case already, at \`${there.path}\``)
  const typeAt = world.index.listedAt(pageType.slug, temperStatCase.slug)[0]?.path
  if (typeAt === undefined) return refusing(`\`${temperStatCase.slug}\` names no page type`)
  const pageAt = join(dirname(typeAt), "pages", slug, `${slug}.${temperStatCase.slug}.ts`)
  const statsAt = besideAt(pageAt, verifiedStats.propertySlug, "json")
  const typesAt = besideAt(typeAt, "types", "ts")
  if (statsAt === null || typesAt === null) return refusing(`\`${slug}\` names no page path`)
  const statCase = pin({
    character,
    bar,
    buildHash,
    capturedAt: reading.capturedAt,
    esoVersion,
    inCombat: reading.inCombat,
    ...(reading.ultimate === undefined ? {} : { ultimate: reading.ultimate }),
    activeBuffs: reading.activeBuffs ?? [],
    championPoints: reading.championPoints ?? [],
    stats: settledOf({ ...reading.stats, ...sheetStatsOf(reading.advancedSheet) }, reading.fete),
  })
  const title = `${character}, ${named} bar, read ${stampOf(reading.capturedAt)}`
  return stating([
    { kind: "add", path: pageAt, content: pageFor(slug, title, typesAt) },
    { kind: "add", path: statsAt, content: statCaseText(statCase) },
  ])
}

export const takes: readonly string[] = [CHARACTER, READING, BAR, SLUG]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  await Promise.all([loadSkillCatalog(), loadSetCatalog(), loadMetricCatalog()])
  return pinStatCaseCommand(world, given, pinnedCaseOf)
}
