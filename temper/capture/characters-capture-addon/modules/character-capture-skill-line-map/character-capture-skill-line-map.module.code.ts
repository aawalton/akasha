import { MORPHABLE_SKILLS_DETAIL_PER_LINE_00 } from "akasha/temper/capture/characters-capture-addon/modules/character-capture-morphable-00/character-capture-morphable-00.module.code.ts"
import { MORPHABLE_SKILLS_DETAIL_PER_LINE_01 } from "akasha/temper/capture/characters-capture-addon/modules/character-capture-morphable-01/character-capture-morphable-01.module.code.ts"
import { MORPHABLE_SKILLS_DETAIL_PER_LINE_02 } from "akasha/temper/capture/characters-capture-addon/modules/character-capture-morphable-02/character-capture-morphable-02.module.code.ts"
import { MORPHABLE_SKILLS_DETAIL_PER_LINE_03 } from "akasha/temper/capture/characters-capture-addon/modules/character-capture-morphable-03/character-capture-morphable-03.module.code.ts"
import { MORPHABLE_SKILLS_DETAIL_PER_LINE_04 } from "akasha/temper/capture/characters-capture-addon/modules/character-capture-morphable-04/character-capture-morphable-04.module.code.ts"
import "akasha/temper/eso/type/lua-language-extensions/lua-language-extensions.type-declaration.d.ts"
import { temperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.ts"
import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"
import { companion } from "akasha/temper/catalog/skill/line-category/pages/companion.temper-skill-line-category.ts"
import { temperSkillLineCategory } from "akasha/temper/catalog/skill/line-category/temper-skill-line-category.page-type.ts"

const COMPANION = `${temperSkillLineCategory.slug}/${companion.slug}`

type Line = Pick<TemperSkillLine, "esoSkillLineId" | "category" | "hashPlace">

type Places = { [esoSkillLineId: number]: number | undefined }

let held: Places | undefined

function placesOf(this: void): Places {
  const lines = [...$pagesOfType<Line>(temperSkillLine)].filter((one) => one.category !== COMPANION)
  lines.sort((one, other) => one.hashPlace - other.hashPlace)
  const found: Places = {}
  lines.forEach((one, at) => {
    if (one.esoSkillLineId > 0) found[one.esoSkillLineId] = at
  })
  return found
}

export const MORPHABLE_SKILLS_DETAIL_PER_LINE: Record<
  number,
  ReadonlyArray<{
    baseName: string
    morph1Name: string
    morph2Name: string
    skillType: "active" | "ultimate"
    lineRankNeeded: number
  }>
> = {
  ...MORPHABLE_SKILLS_DETAIL_PER_LINE_00,
  ...MORPHABLE_SKILLS_DETAIL_PER_LINE_01,
  ...MORPHABLE_SKILLS_DETAIL_PER_LINE_02,
  ...MORPHABLE_SKILLS_DETAIL_PER_LINE_03,
  ...MORPHABLE_SKILLS_DETAIL_PER_LINE_04,
}

export function getPlayerSkillLineIndex(esoSkillLineId: number): number {
  held ??= placesOf()
  const place = held[esoSkillLineId]
  return place === undefined ? 0 : place
}
