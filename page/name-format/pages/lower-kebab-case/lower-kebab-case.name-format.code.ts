import { matching } from "akasha/page/name-format/modules/name-matching/name-matching.module.code.ts"

export const lowerKebabCase = matching(/^[a-z0-9]+(-[a-z0-9]+)*$/)

const CAPITAL = /[A-Z]/g

export function inLowerKebabCase(camel: string): string {
  return camel.replace(CAPITAL, (one) => `-${one.toLowerCase()}`)
}
