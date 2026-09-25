import { matching } from "akasha/page/name-format/modules/name-matching/name-matching.module.code.ts"

export const lowerKebabCase = matching(/^[a-z0-9]+(-[a-z0-9]+)*$/)

const CAPITAL = /[A-Z]/g

export function inLowerKebabCase(camel: string): string {
  return camel.replace(CAPITAL, (one) => `-${one.toLowerCase()}`)
}

const CAPITAL_AFTER_LOWER = /([a-z0-9])([A-Z])/g

const CAPITAL_BEFORE_WORD = /([A-Z])([A-Z][a-z])/g

export function inLowerKebabCaseAcronymsWhole(camel: string): string {
  return camel
    .replace(CAPITAL_AFTER_LOWER, "$1-$2")
    .replace(CAPITAL_BEFORE_WORD, "$1-$2")
    .toLowerCase()
}
