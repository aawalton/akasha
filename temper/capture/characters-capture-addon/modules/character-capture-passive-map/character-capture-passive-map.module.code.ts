import "akasha/temper/eso/type/lua-language-extensions/lua-language-extensions.type-declaration.d.ts"
import {
  type SkillPage,
  skillLinePages,
  skillPages,
} from "akasha/temper/capture/characters-capture-addon/modules/character-capture-skill-pages/character-capture-skill-pages.module.code.ts"
import { temperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.ts"
import { companion } from "akasha/temper/catalog/skill/line-category/pages/companion.temper-skill-line-category.ts"
import { temperSkillLineCategory } from "akasha/temper/catalog/skill/line-category/temper-skill-line-category.page-type.ts"
import { passive } from "akasha/temper/catalog/skill/type/pages/passive.temper-skill-type.ts"
import { temperSkillType } from "akasha/temper/catalog/skill/type/temper-skill-type.page-type.ts"

const COMPANION = `${temperSkillLineCategory.slug}/${companion.slug}`

const PASSIVE = `${temperSkillType.slug}/${passive.slug}`

type Indices = { [esoSkillId: number]: number | undefined }

type Held = { count: number; indices: Indices }

let held: Held | undefined

function companionLines(this: void): { [line: string]: boolean | undefined } {
  const found: { [line: string]: boolean | undefined } = {}
  for (const one of skillLinePages()) {
    if (one.category === COMPANION) found[`${temperSkillLine.slug}/${one.slug}`] = true
  }
  return found
}

function heldOf(this: void): Held {
  const companions = companionLines()
  const passives: SkillPage[] = skillPages().filter(
    (one) => one.skillType === PASSIVE && companions[one.skillLineId] !== true
  )
  passives.sort((one, other) => one.hashPlace - other.hashPlace)
  const indices: Indices = {}
  passives.forEach((one, at) => {
    if (one.esoSkillId !== 0 && indices[one.esoSkillId] === undefined) indices[one.esoSkillId] = at
  })
  return { count: passives.length, indices }
}

export function characterPassiveSkillCount(): number {
  held ??= heldOf()
  return held.count
}

export function getPassiveBitmaskIndex(esoSkillId: number): number | undefined {
  held ??= heldOf()
  return held.indices[esoSkillId]
}
