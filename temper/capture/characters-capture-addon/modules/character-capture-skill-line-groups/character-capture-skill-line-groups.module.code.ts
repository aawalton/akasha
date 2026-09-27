import "akasha/temper/eso/type/lua-language-extensions/lua-language-extensions.type-declaration.d.ts"
import {
  type SkillLinePage,
  skillLinePages,
} from "akasha/temper/capture/characters-capture-addon/modules/character-capture-skill-pages/character-capture-skill-pages.module.code.ts"
import { allianceWarEmperor } from "akasha/temper/catalog/skill/line/pages/alliance-war-emperor.temper-skill-line.ts"
import { temperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.ts"
import { characterClass } from "akasha/temper/catalog/skill/line-category/pages/character-class.temper-skill-line-category.ts"
import { companion } from "akasha/temper/catalog/skill/line-category/pages/companion.temper-skill-line-category.ts"
import { none } from "akasha/temper/catalog/skill/line-category/pages/none.temper-skill-line-category.ts"
import { racial } from "akasha/temper/catalog/skill/line-category/pages/racial.temper-skill-line-category.ts"
import { temperSkillLineCategory } from "akasha/temper/catalog/skill/line-category/temper-skill-line-category.page-type.ts"
import { temperClass } from "akasha/temper/catalog/skill/temper-class/temper-class.page-type.ts"
import type { TemperClass } from "akasha/temper/catalog/skill/temper-class/temper-class.page-type.types.ts"
import { temperRace } from "akasha/temper/catalog/world/temper-race/temper-race.page-type.ts"
import type { TemperRace } from "akasha/temper/catalog/world/temper-race/temper-race.page-type.types.ts"

type Line = SkillLinePage

type Groups = {
  readonly byClass: { [esoClassId: number]: number[] | undefined }
  readonly allClass: { [esoSkillLineId: number]: boolean | undefined }
  readonly racialByRace: { [esoRaceId: number]: number | undefined }
  readonly base: { [esoSkillLineId: number]: true | undefined }
}

const NOT_BASE: readonly string[] = [characterClass, racial, companion, none].map(
  (one) => `${temperSkillLineCategory.slug}/${one.slug}`
)

let held: Groups | undefined

function linesInPlace(this: void): readonly Line[] {
  const lines = [...skillLinePages()]
  lines.sort((one, other) => one.hashPlace - other.hashPlace)
  return lines
}

function groupsOf(this: void): Groups {
  const lines = linesInPlace()
  const classEso: { [address: string]: number | undefined } = {}
  for (const one of $pagesOfType<Pick<TemperClass, "slug" | "esoClassId">>(temperClass)) {
    classEso[`${temperClass.slug}/${one.slug}`] = one.esoClassId
  }
  const lineEso: { [address: string]: number | undefined } = {}
  for (const one of lines) lineEso[`${temperSkillLine.slug}/${one.slug}`] = one.esoSkillLineId
  const found: Groups = { byClass: {}, allClass: {}, racialByRace: {}, base: {} }
  for (const one of lines) {
    if (one.esoSkillLineId <= 0) continue
    const esoClassId = one.class === undefined ? undefined : classEso[one.class]
    if (esoClassId !== undefined) {
      const held = found.byClass[esoClassId] ?? []
      held.push(one.esoSkillLineId)
      found.byClass[esoClassId] = held
      found.allClass[one.esoSkillLineId] = true
    }
    if (!NOT_BASE.includes(one.category) && one.slug !== allianceWarEmperor.slug) {
      found.base[one.esoSkillLineId] = true
    }
  }
  for (const one of $pagesOfType<Pick<TemperRace, "esoRaceId" | "racialSkillLine">>(temperRace)) {
    if (one.racialSkillLine === undefined) continue
    found.racialByRace[one.esoRaceId] = lineEso[one.racialSkillLine]
  }
  return found
}

export function skillLineGroups(): Groups {
  held ??= groupsOf()
  return held
}

type ApplicableInputs = {
  readonly baseApplicableEsoLineIds: ReadonlySet<number>
  readonly classLinesByEsoClassId: ReadonlyMap<number, readonly number[]>
  readonly racialLineByEsoRaceId: ReadonlyMap<number, number>
}

export function applicableInputs(): ApplicableInputs {
  const groups = skillLineGroups()
  const base = new Set<number>()
  for (const k of Object.keys(groups.base)) base.add(Number(k))
  const byClass = new Map<number, readonly number[]>()
  for (const k of Object.keys(groups.byClass)) {
    const lines = groups.byClass[Number(k)]
    if (lines !== undefined) byClass.set(Number(k), lines)
  }
  const byRace = new Map<number, number>()
  for (const k of Object.keys(groups.racialByRace)) {
    const line = groups.racialByRace[Number(k)]
    if (line !== undefined) byRace.set(Number(k), line)
  }
  return {
    baseApplicableEsoLineIds: base,
    classLinesByEsoClassId: byClass,
    racialLineByEsoRaceId: byRace,
  }
}
