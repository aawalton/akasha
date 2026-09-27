import "akasha/temper/eso/type/lua-language-extensions/lua-language-extensions.type-declaration.d.ts"
import {
  type SkillPage,
  scribedSkillPages,
  skillPages,
} from "akasha/temper/capture/characters-capture-addon/modules/character-capture-skill-pages/character-capture-skill-pages.module.code.ts"

type Placed = Pick<SkillPage, "esoSkillId" | "hashPlace">

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
  for (const one of skillPages()) note(found, one)
  for (const one of scribedSkillPages()) note(found, one)
  return found
}

export function getPlayerSkillIndex(esoSkillId: number): number {
  if (held === undefined) held = placesOf()
  return held[esoSkillId] ?? 0
}
