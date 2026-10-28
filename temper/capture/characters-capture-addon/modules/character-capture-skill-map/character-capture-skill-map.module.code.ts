import "akasha/temper/eso/type/lua-language-extensions/lua-language-extensions.type-declaration.d.ts"
import { scribedSkillPages } from "akasha/temper/capture/characters-capture-addon/modules/character-capture-scribed-skill-map/character-capture-scribed-skill-map.module.code.ts"
import {
  type SkillPage,
  skillPages,
} from "akasha/temper/capture/characters-capture-addon/modules/character-capture-skill-pages/character-capture-skill-pages.module.code.ts"

type Placed = Pick<SkillPage, "esoAbilityId" | "hashPlace">

type Places = { [esoAbilityId: number]: number | undefined }

let held: Places | undefined

function note(this: void, into: Places, one: Placed): undefined {
  if (one.esoAbilityId === 0) return undefined
  const known = into[one.esoAbilityId]
  if (known === undefined || one.hashPlace < known) into[one.esoAbilityId] = one.hashPlace
  return undefined
}

let indices: Places | undefined

function placesOf(this: void): Places {
  const found: Places = {}
  for (const one of skillPages()) note(found, one)
  for (const one of scribedSkillPages()) note(found, one)
  return found
}

function indicesOf(this: void): Places {
  const places: number[] = []
  for (const one of skillPages()) places.push(one.hashPlace)
  for (const one of scribedSkillPages()) places.push(one.hashPlace)
  places.sort((one, other) => one - other)
  const found: Places = {}
  for (const [index, place] of places.entries()) found[place] = index
  return found
}

export function skillIndexOfPlace(place: number): number {
  if (indices === undefined) indices = indicesOf()
  return indices[place] ?? 0
}

export function getPlayerSkillIndex(esoAbilityId: number): number {
  if (held === undefined) held = placesOf()
  return skillIndexOfPlace(held[esoAbilityId] ?? 0)
}
