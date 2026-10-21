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
import {
  isPicked,
  linesOf,
  newestOf,
  stampOf,
} from "akasha/temper/player/character/stat/modules/reading-line-picking/reading-line-picking.module.code.ts"
import {
  type BuildHeld,
  type Equations,
  equationsIn,
  heldOfBuild,
  heldOfCase,
  pinnedTooltipCaseOf,
  tooltipCaseText,
} from "akasha/temper/player/character/stat/modules/tooltip-case/tooltip-case.module.code.ts"
import { verifiedTooltips } from "akasha/temper/player/character/stat/temper-tooltip-case/properties/verified-tooltips.file-property.ts"
import { temperTooltipCase } from "akasha/temper/player/character/stat/temper-tooltip-case/temper-tooltip-case.page-type.ts"
import { readings } from "akasha/temper/player/character/temper-account-character/properties/readings.file-property.ts"
import { temperAccountCharacter } from "akasha/temper/player/character/temper-account-character/temper-account-character.page-type.ts"
import { reportedStatsReadingSchema } from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"

const CHARACTER = "character"

const READING = "reading"

const BAR = "bar"

const SLUG = "slug"

const BARS = {
  frontBar: { named: "front", bar: "primary-weapon-bar" },
  backBar: { named: "back", bar: "backup-weapon-bar" },
} as const

const BAR_KEYS = { front: "frontBar", back: "backBar" } as const

type Asked = Readonly<Record<string, string>>

function pageFor(slug: string, title: string, typesAt: string): string {
  return [
    `import type { TemperTooltipCase } from "${akasha.slug}/${typesAt}"`,
    "",
    `export const ${slug.replace(/-([a-z0-9])/g, (_, one: string) => one.toUpperCase())} = {`,
    `  type: "page-type/${temperTooltipCase.slug}",`,
    `  slug: "${slug}",`,
    `  title: ${JSON.stringify(title)},`,
    `  ${verifiedTooltips.propertySlug.replace(/-([a-z])/g, (_, one: string) => one.toUpperCase())}: "json",`,
    "} as const satisfies TemperTooltipCase",
    "",
  ].join("\n")
}

type HeldOf = (hash: string) => BuildHeld | undefined

export function pinTooltipCaseCommand(
  world: World,
  given: Asked,
  equations: Equations,
  heldOf: HeldOf = () => undefined
): Answer {
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
  const skills = reading.skills ?? []
  if (skills.length === 0) {
    return refusing(`the reading \`${line.id}\` of \`${character}\` keeps no slotted skill`)
  }
  const { named, bar } = BARS[line.bar]
  const slug = given[SLUG] ?? `${character}-${named}-bar-${stampOf(reading.capturedAt)}`
  const there = world.index.listedAt(temperTooltipCase.slug, slug)[0]
  if (there !== undefined) return refusing(`\`${slug}\` is a case already, at \`${there.path}\``)
  const typeAt = world.index.listedAt(pageType.slug, temperTooltipCase.slug)[0]?.path
  if (typeAt === undefined) return refusing(`\`${temperTooltipCase.slug}\` names no page type`)
  const pageAt = join(dirname(typeAt), "pages", slug, `${slug}.${temperTooltipCase.slug}.ts`)
  const tooltipsAt = besideAt(pageAt, verifiedTooltips.propertySlug, "json")
  const typesAt = besideAt(typeAt, "types", "ts")
  if (tooltipsAt === null || typesAt === null) return refusing(`\`${slug}\` names no page path`)
  const tooltipCase = pinnedTooltipCaseOf(
    {
      character,
      bar,
      capturedAt: reading.capturedAt,
      esoVersion,
      stats: reading.stats,
      ...heldOfCase(heldOf(line.buildHash), reading, bar),
      skills: [...skills]
        .sort((one, two) => one.slot - two.slot)
        .map(({ abilityId, name, description, durationMs }) => ({
          abilityId,
          name,
          description,
          durationMs,
        })),
    },
    equations
  )
  const title = `${character}, ${named} bar tooltips, read ${stampOf(reading.capturedAt)}`
  return stating([
    { kind: "add", path: pageAt, content: pageFor(slug, title, typesAt) },
    { kind: "add", path: tooltipsAt, content: tooltipCaseText(tooltipCase) },
  ])
}

export const takes: readonly string[] = [CHARACTER, READING, BAR, SLUG]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  await Promise.all([loadSkillCatalog(), loadSetCatalog()])
  return pinTooltipCaseCommand(world, given, equationsIn(world.root), heldOfBuild)
}
