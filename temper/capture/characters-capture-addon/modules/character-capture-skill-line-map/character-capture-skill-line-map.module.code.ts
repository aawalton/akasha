import "akasha/temper/eso/type/lua-language-extensions/lua-language-extensions.type-declaration.d.ts"
import {
  type SkillLinePage,
  skillLinePages,
  skillPages,
} from "akasha/temper/capture/characters-capture-addon/modules/character-capture-skill-pages/character-capture-skill-pages.module.code.ts"
import { temperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.ts"
import { companion } from "akasha/temper/catalog/skill/line-category/pages/companion.temper-skill-line-category.ts"
import { temperSkillLineCategory } from "akasha/temper/catalog/skill/line-category/temper-skill-line-category.page-type.ts"
import { passive } from "akasha/temper/catalog/skill/type/pages/passive.temper-skill-type.ts"
import { ultimate } from "akasha/temper/catalog/skill/type/pages/ultimate.temper-skill-type.ts"
import { temperSkillType } from "akasha/temper/catalog/skill/type/temper-skill-type.page-type.ts"

const COMPANION = `${temperSkillLineCategory.slug}/${companion.slug}`

const PASSIVE = `${temperSkillType.slug}/${passive.slug}`

const ULTIMATE = `${temperSkillType.slug}/${ultimate.slug}`

type PlayerSkillLine = SkillLinePage

type MorphableDetail = {
  baseName: string
  morph1Name: string
  morph2Name: string
  skillType: "active" | "ultimate"
  lineRankNeeded: number
}

type Group = MorphableDetail & { line: string; hasBase: boolean; order: number }

type DetailsByLine = { [esoSkillLineId: number]: readonly MorphableDetail[] | undefined }

type Places = { [esoSkillLineId: number]: number | undefined }

let lines: readonly PlayerSkillLine[] | undefined

let places: Places | undefined

let details: DetailsByLine | undefined

export function playerSkillLines(): readonly PlayerSkillLine[] {
  if (lines !== undefined) return lines
  const found = skillLinePages().filter((one) => one.category !== COMPANION)
  found.sort((one, other) => one.hashPlace - other.hashPlace)
  lines = found
  return found
}

function placesOf(this: void): Places {
  const found: Places = {}
  playerSkillLines().forEach((one, at) => {
    if (one.esoSkillLineId > 0) found[one.esoSkillLineId] = at
  })
  return found
}

export function getPlayerSkillLineIndex(esoSkillLineId: number): number {
  places ??= placesOf()
  const place = places[esoSkillLineId]
  return place === undefined ? 0 : place
}

function groupsOf(this: void): readonly Group[] {
  const skills = [...skillPages()]
  skills.sort((one, other) => one.hashPlace - other.hashPlace)
  const byKey: { [key: string]: Group | undefined } = {}
  const inOrder: Group[] = []
  for (const skill of skills) {
    if (skill.esoSkillId === 0 || skill.skillType === PASSIVE) continue
    const key = `${skill.skillLineId}:${skill.baseName}`
    let group = byKey[key]
    if (group === undefined) {
      group = {
        line: skill.skillLineId,
        baseName: skill.baseName,
        morph1Name: "",
        morph2Name: "",
        skillType: skill.skillType === ULTIMATE ? "ultimate" : "active",
        lineRankNeeded: 0,
        hasBase: false,
        order: inOrder.length,
      }
      byKey[key] = group
      inOrder.push(group)
    }
    if (skill.morphIndex === 0) group.hasBase = true
    if (skill.morphIndex === 1) {
      group.morph1Name = skill.title ?? ""
      group.lineRankNeeded = skill.lineRankNeeded
    }
    if (skill.morphIndex === 2) group.morph2Name = skill.title ?? ""
  }
  return inOrder
}

function detailsOf(this: void): DetailsByLine {
  const esoOf: { [address: string]: number | undefined } = {}
  for (const one of skillLinePages()) {
    esoOf[`${temperSkillLine.slug}/${one.slug}`] = one.esoSkillLineId
  }
  const grouped: { [esoSkillLineId: number]: Group[] | undefined } = {}
  const seen: number[] = []
  for (const group of groupsOf()) {
    const eso = esoOf[group.line]
    if (!group.hasBase || eso === undefined) continue
    const held = grouped[eso]
    if (held === undefined) {
      grouped[eso] = [group]
      seen.push(eso)
    } else {
      held.push(group)
    }
  }
  const found: DetailsByLine = {}
  for (const eso of seen) {
    const held = grouped[eso] ?? []
    held.sort((one, other) => one.lineRankNeeded - other.lineRankNeeded || one.order - other.order)
    found[eso] = held.map((one) => ({
      baseName: one.baseName,
      morph1Name: one.morph1Name,
      morph2Name: one.morph2Name,
      skillType: one.skillType,
      lineRankNeeded: one.lineRankNeeded,
    }))
  }
  return found
}

export function morphableSkillsDetailPerLine(): DetailsByLine {
  details ??= detailsOf()
  return details
}
