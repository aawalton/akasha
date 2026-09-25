import { matching } from "akasha/page/name-format/modules/name-matching/name-matching.module.code.ts"

export const lowerCamelCase = matching(/^[a-z][a-z0-9]*([A-Z][a-z0-9]*)*$/)

const JOIN = /-([a-z0-9])/g

export function inLowerCamelCase(kebab: string): string {
  return kebab.replace(JOIN, (_, one: string) => one.toUpperCase())
}

const PARTING = /[^A-Za-z0-9]+/

const KEBAB_JOIN = "-"

function lowered(word: string): string {
  return word.charAt(0).toLowerCase() + word.slice(1)
}

export function foldedInLowerCamelCase(key: string): string {
  const words = key.split(PARTING).filter((one) => one !== "")
  return inLowerCamelCase(words.map(lowered).join(KEBAB_JOIN))
}
