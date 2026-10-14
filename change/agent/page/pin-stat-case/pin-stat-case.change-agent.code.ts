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
import { loadMetricCatalog } from "akasha/temper/player/character/stat/modules/metric-catalog-loading/metric-catalog-loading.module.code.ts"
import {
  pinnedCaseOf,
  statCaseText,
} from "akasha/temper/player/character/stat/modules/stat-case/stat-case.module.code.ts"
import { verifiedStats } from "akasha/temper/player/character/stat/temper-stat-case/properties/verified-stats.file-property.ts"
import { temperStatCase } from "akasha/temper/player/character/stat/temper-stat-case/temper-stat-case.page-type.ts"
import { temperAccountCharacter } from "akasha/temper/player/character/temper-account-character/temper-account-character.page-type.ts"
import { completion } from "akasha/temper/player/character/thing/properties/completion.file-property.ts"
import { characterCompletionSchema } from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"

const CHARACTER = "character"

const BAR = "bar"

const SLUG = "slug"

const BARS = {
  front: { reading: "frontBar", bar: "primary-weapon-bar" },
  back: { reading: "backBar", bar: "backup-weapon-bar" },
} as const

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

export function pinStatCaseCommand(world: World, given: Asked, pin: Pin): Answer {
  const character = given[CHARACTER]
  if (character === undefined) return refusing(missing(CHARACTER))
  const named = given[BAR]
  if (named === undefined) return refusing(missing(BAR))
  if (named !== "front" && named !== "back") {
    return refusing(`\`${named}\` is no bar, and a bar is \`front\` or \`back\``)
  }
  const { reading: readingKey, bar } = BARS[named]
  const characterAt = world.index.listedAt(temperAccountCharacter.slug, character)[0]?.path
  if (characterAt === undefined) return refusing(`\`${character}\` names no character page`)
  const completionAt = besideAt(characterAt, completion.propertySlug, "json")
  const text = completionAt === null ? null : world.textOf(completionAt)
  if (text === null) return refusing(`\`${character}\` holds no completion to pin from`)
  const parsed = characterCompletionSchema.safeParse(JSON.parse(text))
  if (!parsed.success) return refusing(`the completion of \`${character}\` does not read`)
  const { buildHash, reportedStats } = parsed.data
  const reading = reportedStats?.[readingKey]
  if (buildHash === undefined || reading?.activeBuffs === undefined) {
    return refusing(`\`${character}\` holds no ${named} bar reading with its buffs to pin`)
  }
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
    inCombat: reading.inCombat,
    activeBuffs: reading.activeBuffs,
    championPoints: reading.championPoints ?? [],
    stats: reading.stats,
  })
  const title = `${character}, ${named} bar, read ${stampOf(reading.capturedAt)}`
  return stating([
    { kind: "add", path: pageAt, content: pageFor(slug, title, typesAt) },
    { kind: "add", path: statsAt, content: statCaseText(statCase) },
  ])
}

export const takes: readonly string[] = [CHARACTER, BAR, SLUG]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  await Promise.all([loadSkillCatalog(), loadSetCatalog(), loadMetricCatalog()])
  return pinStatCaseCommand(world, given, pinnedCaseOf)
}
