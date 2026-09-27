import "akasha/temper/eso/type/lua-language-extensions/lua-language-extensions.type-declaration.d.ts"
import { temperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.ts"
import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"
import { temperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.ts"
import type { TemperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.types.ts"
import { temperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.ts"
import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export type SkillPage = Pick<
  TemperSkill,
  | "esoSkillId"
  | "skillType"
  | "skillLineId"
  | "baseName"
  | "title"
  | "morphIndex"
  | "lineRankNeeded"
  | "hashPlace"
>

export type ScribedSkillPage = Pick<
  TemperScribedSkill,
  "esoSkillId" | "grimoireId" | "focusScriptId" | "hashPlace"
>

export type SkillLinePage = Pick<
  TemperSkillLine,
  | "slug"
  | "key"
  | "esoSkillLineId"
  | "category"
  | "class"
  | "hashPlace"
  | "maxRank"
  | "displayOrder"
>

let skills: readonly SkillPage[] | undefined

let scribed: readonly ScribedSkillPage[] | undefined

let lines: readonly SkillLinePage[] | undefined

export function skillPages(): readonly SkillPage[] {
  skills ??= [...$pagesOfType<SkillPage>(temperSkill)]
  return skills
}

export function scribedSkillPages(): readonly ScribedSkillPage[] {
  if (scribed === undefined) scribed = [...$pagesOfType<ScribedSkillPage>(temperScribedSkill)]
  return scribed
}

export function skillLinePages(): readonly SkillLinePage[] {
  const held = lines ?? [...$pagesOfType<SkillLinePage>(temperSkillLine)]
  lines = held
  return held
}
