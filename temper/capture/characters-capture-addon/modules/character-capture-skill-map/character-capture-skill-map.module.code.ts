import "akasha/temper/eso/type/lua-language-extensions/lua-language-extensions.type-declaration.d.ts"
import { temperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.ts"
import { temperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.ts"
import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

type Placed = Pick<TemperSkill, "esoSkillId" | "hashPlace">

type Places = { [esoSkillId: number]: number | undefined }

let held: Places | undefined

function note(this: void, into: Places, one: Placed): undefined {
  if (one.esoSkillId === 0) return undefined
  const known = into[one.esoSkillId]
  if (known === undefined || one.hashPlace < known) into[one.esoSkillId] = one.hashPlace
  return undefined
}

function placesOf(this: void): Places {
  const found: Places = {}
  for (const one of $pagesOfType<Placed>(temperSkill)) note(found, one)
  for (const one of $pagesOfType<Placed>(temperScribedSkill)) note(found, one)
  return found
}

export function getPlayerSkillIndex(esoSkillId: number): number {
  if (held === undefined) held = placesOf()
  return held[esoSkillId] ?? 0
}
