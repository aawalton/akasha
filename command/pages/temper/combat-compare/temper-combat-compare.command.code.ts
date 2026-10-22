import { readFileSync } from "node:fs"
import { join } from "node:path"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { character } from "akasha/command/argument/pages/character.argument.ts"
import { json } from "akasha/command/argument/pages/json.argument.ts"
import {
  asJson,
  DATA,
  INPUT,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { temperCombatCompare as page } from "akasha/command/pages/temper/combat-compare/temper-combat-compare.command.ts"
import {
  listedAt,
  valuesOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { loadSetCatalog } from "akasha/temper/player/character/characters-equipment/modules/set-catalog-loading/set-catalog-loading.module.code.ts"
import { loadSkillCatalog } from "akasha/temper/player/character/skill/modules/skill-catalog-loading/skill-catalog-loading.module.code.ts"
import {
  buildReadingsOf,
  type CombatCase,
  combatCaseShape,
  combatCaseText,
  type Hit,
  hitLanded,
  workedHitOf,
} from "akasha/temper/player/character/stat/modules/combat-case/combat-case.module.code.ts"
import { loadMetricCatalog } from "akasha/temper/player/character/stat/modules/metric-catalog-loading/metric-catalog-loading.module.code.ts"
import { verifiedHits } from "akasha/temper/player/character/stat/temper-combat-case/properties/verified-hits.file-property.ts"
import { temperCombatCase } from "akasha/temper/player/character/stat/temper-combat-case/temper-combat-case.page-type.ts"
import { temperAccountCharacter } from "akasha/temper/player/character/temper-account-character/temper-account-character.page-type.ts"

const NAMED = [character, json]

const NUMBER = 8

type HitCompared = {
  readonly fight: number
  readonly ms: number
  readonly target: string
  readonly game: number
  readonly temper: number | null
}

type CaseCompared = {
  readonly slug: string
  readonly readingsAgreeing: number
  readonly readingsFound: number
  readonly enchants: readonly string[]
  readonly enchant: string
  readonly writtenAsCase: boolean
  readonly pinned: readonly HitCompared[]
  readonly unexplained: readonly HitCompared[]
}

type CaseHeld = { readonly slug: string; readonly text: string; readonly combatCase: CombatCase }

function hitComparedOf(combatCase: CombatCase, hit: Hit): HitCompared {
  return {
    fight: hit.fight,
    ms: hit.ms,
    target: hit.target,
    game: hitLanded(hit),
    temper: workedHitOf(combatCase, hit),
  }
}

function caseComparedOf(root: string, held: CaseHeld): CaseCompared {
  const { combatCase } = held
  const found = buildReadingsOf(root, combatCase)
  return {
    slug: held.slug,
    readingsAgreeing: combatCase.readingsAgreeing,
    readingsFound: found.ids.length,
    enchants: found.enchants,
    enchant: combatCase.enchant,
    writtenAsCase: combatCaseText(combatCase) === held.text,
    pinned: combatCase.pinned.map((hit) => hitComparedOf(combatCase, hit)),
    unexplained: combatCase.unexplained.map((hit) => hitComparedOf(combatCase, hit)),
  }
}

function cell(text: string): string {
  return text.padStart(NUMBER)
}

function hitLine(one: HitCompared): string {
  const temper = one.temper === null ? "-" : String(one.temper)
  const gap = one.temper === null ? null : one.temper - one.game
  const said = gap === null ? "-" : `${gap > 0 ? "+" : ""}${String(gap)}`
  const mark = one.temper === one.game ? "=" : " "
  return `    ${mark} ${cell(String(one.game))} ${cell(temper)} ${cell(said)}  fight ${String(one.fight)} at ${String(one.ms)} ms on ${one.target}`
}

function agreedLine(one: CaseCompared): string {
  const agreeing = one.enchants.length === 1 && one.enchants[0] === one.enchant
  const glyphs = agreeing
    ? "all name its glyph"
    : `they name ${one.enchants.join(" | ") || "no glyph"}`
  return `  ${String(one.readingsFound)} readings of its build, the case says ${String(one.readingsAgreeing)}; ${glyphs}`
}

function caseLines(one: CaseCompared): readonly string[] {
  const matched = one.pinned.filter((hit) => hit.temper === hit.game).length
  const closed = one.unexplained.filter((hit) => hit.temper === hit.game).length
  return [
    one.slug,
    agreedLine(one),
    `  file ${one.writtenAsCase ? "is" : "is not"} written as a case is written`,
    `    ${" ".repeat(2)}${cell("game")} ${cell("temper")} ${cell("diff")}`,
    "  pinned",
    ...one.pinned.map(hitLine),
    ...(one.unexplained.length === 0 ? [] : ["  unexplained", ...one.unexplained.map(hitLine)]),
    `  ${String(matched)} of ${String(one.pinned.length)} pinned hits match, ${String(closed)} of ${String(one.unexplained.length)} unexplained now match`,
    "",
  ]
}

function casesOf(root: string, slug: string): readonly CaseHeld[] | { readonly refused: string } {
  const held: CaseHeld[] = []
  for (const one of valuesOfType(root, temperCombatCase.slug)) {
    const at = besideAt(one.path, verifiedHits.propertySlug, "json")
    if (at === null) continue
    let text: string
    try {
      text = readFileSync(join(root, at), "utf8")
    } catch (thrown) {
      return { refused: `\`${String(one.value.slug)}\` holds no hits: ${saidBy(thrown)}` }
    }
    const read = combatCaseShape.safeParse(JSON.parse(text))
    if (!read.success) return { refused: `\`${String(one.value.slug)}\` is no combat case` }
    if (read.data.character === slug) {
      held.push({ slug: String(one.value.slug), text, combatCase: read.data })
    }
  }
  return held.sort((one, other) => one.slug.localeCompare(other.slug))
}

export async function temperCombatCompare(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const slug = read.taken.character
  if (listedAt(given.root, temperAccountCharacter.slug, slug)[0] === undefined) {
    return refused(`\`${slug}\` names no character page`, INPUT)
  }
  const cases = casesOf(given.root, slug)
  if ("refused" in cases) return refused(cases.refused, DATA)
  if (cases.length === 0) return told([`\`${slug}\` has no combat case`])
  await Promise.all([loadSkillCatalog(), loadSetCatalog(), loadMetricCatalog()])
  const compared = cases.map((one) => caseComparedOf(given.root, one))
  if (read.taken.json) return asJson({ character: slug, cases: compared })
  return told(compared.flatMap(caseLines))
}
