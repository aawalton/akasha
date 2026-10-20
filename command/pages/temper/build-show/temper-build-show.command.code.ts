import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { build } from "akasha/command/argument/pages/build.argument.ts"
import { compare } from "akasha/command/argument/pages/compare.argument.ts"
import { gaps } from "akasha/command/argument/pages/gaps.argument.ts"
import { json } from "akasha/command/argument/pages/json.argument.ts"
import {
  asJson,
  INPUT,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import {
  characterFieldsOf,
  companionFieldsOf,
  differenceLines,
  differencesOf,
  type Field,
  fieldLines,
  sectionsOf,
} from "akasha/command/pages/temper/build-show/modules/build-show-fields/build-show-fields.module.code.ts"
import {
  gapLines,
  gapsOf,
  targetStatOf,
} from "akasha/command/pages/temper/build-show/modules/build-show-gap-stats/build-show-gap-stats.module.code.ts"
import {
  AS_HASH,
  type Named,
  namedIn,
} from "akasha/command/pages/temper/build-show/modules/build-show-naming/build-show-naming.module.code.ts"
import { temperBuildShow as page } from "akasha/command/pages/temper/build-show/temper-build-show.command.ts"
import {
  listedAt,
  valueByPath,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { loadCompanionCatalog } from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog-loading/companion-catalog-loading.module.code.ts"
import { decodeBuild } from "akasha/temper/player/character/build/build-codec/modules/build-codec/build-codec.module.code.ts"
import { decodeCompanion } from "akasha/temper/player/character/build/companion-codec/modules/companion-codec/companion-codec.module.code.ts"
import type { CharacterState } from "akasha/temper/player/character/build/modules/build-types/build-types.module.code.ts"
import { characterBuild } from "akasha/temper/player/character/character-build/character-build.page-type.ts"
import { loadSetCatalog } from "akasha/temper/player/character/characters-equipment/modules/set-catalog-loading/set-catalog-loading.module.code.ts"
import { buildHash } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { loadSkillCatalog } from "akasha/temper/player/character/skill/modules/skill-catalog-loading/skill-catalog-loading.module.code.ts"
import { loadMetricCatalog } from "akasha/temper/player/character/stat/modules/metric-catalog-loading/metric-catalog-loading.module.code.ts"

const NAMED = [build, compare, gaps, json]

type Shown = { readonly named: Named; readonly fields: readonly Field[] }

function quietly<T>(work: () => T | null): T | null {
  const warn = console.warn
  console.warn = () => undefined
  try {
    return work()
  } catch {
    return null
  } finally {
    console.warn = warn
  }
}

function fieldsOf(named: Named): readonly Field[] | null {
  const hash = buildHash(named.hash)
  const character = quietly(() => decodeBuild(hash))
  if (character !== null) return characterFieldsOf(character, named.stars)
  const companion = quietly(() => decodeCompanion(hash))
  return companion === null ? null : companionFieldsOf(companion)
}

function shownOf(root: string, said: string): Shown | { readonly refused: string } {
  const naming = namedIn(root, said)
  if ("refused" in naming) return naming
  const fields = fieldsOf(naming.named)
  if (fields !== null) return { named: naming.named, fields }
  if (naming.named.source === AS_HASH) {
    return {
      refused: `\`${said}\` names no build page, character or reading, and is no build hash`,
    }
  }
  return { refused: `\`${said}\` is the ${naming.named.source}, and its hash does not decode` }
}

function headOf(named: Named): string {
  return `${named.said}: ${named.source}`
}

function aboutOf(named: Named): object {
  return { said: named.said, source: named.source, hash: named.hash }
}

function characterOf(named: Named): CharacterState | null {
  return quietly(() => decodeBuild(buildHash(named.hash)))
}

function targetOf(root: string, named: Named): string | null {
  if (named.source !== `${characterBuild.slug} ${named.said}`) return null
  const found = listedAt(root, characterBuild.slug, named.said)[0]
  const description = found === undefined ? null : valueByPath(root, found.path)?.description
  return targetStatOf(named.said, typeof description === "string" ? description : "")
}

function gapsAnswer(root: string, design: Shown, said: string, asJsonToo: boolean): Answer {
  const character = shownOf(root, said)
  if ("refused" in character) return refused(character.refused, INPUT)
  const wanted = characterOf(design.named)
  const held = characterOf(character.named)
  if (wanted === null || held === null) {
    const which = wanted === null ? design.named.said : said
    return refused(`\`${which}\` is a companion's build, and only a character's has gaps`, INPUT)
  }
  const target = targetOf(root, design.named)
  const found = gapsOf(wanted, held, target, design.named.stars, character.named.stars)
  if (asJsonToo) {
    return asJson({ design: aboutOf(design.named), character: aboutOf(character.named), ...found })
  }
  return told([
    `design: ${headOf(design.named)}`,
    `character: ${headOf(character.named)}`,
    "",
    ...gapLines(found),
  ])
}

async function catalogsRead(): Promise<unknown> {
  return await Promise.all([
    loadSkillCatalog(),
    loadSetCatalog(),
    loadMetricCatalog(),
    loadCompanionCatalog(),
  ])
}

export async function temperBuildShow(
  argv: readonly string[],
  given: Given,
  readCatalogs: () => Promise<unknown> = catalogsRead
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  await readCatalogs()
  const first = shownOf(given.root, read.taken.build)
  if ("refused" in first) return refused(first.refused, INPUT)
  const short = read.taken.gaps
  if (short !== undefined) return gapsAnswer(given.root, first, short, read.taken.json)
  const against = read.taken.compare
  if (against === undefined) {
    if (read.taken.json) {
      return asJson({ ...aboutOf(first.named), sections: sectionsOf(first.fields) })
    }
    return told([headOf(first.named), first.named.hash, "", ...fieldLines(first.fields)])
  }
  const second = shownOf(given.root, against)
  if ("refused" in second) return refused(second.refused, INPUT)
  const differences = differencesOf(first.fields, second.fields)
  if (read.taken.json) {
    return asJson({ first: aboutOf(first.named), second: aboutOf(second.named), differences })
  }
  return told([
    `- ${headOf(first.named)}`,
    `+ ${headOf(second.named)}`,
    `${String(differences.length)} differences`,
    "",
    ...differenceLines(differences),
  ])
}
