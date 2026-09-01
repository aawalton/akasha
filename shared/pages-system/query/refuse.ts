import type { DeclaredType, Place, Refused } from "../formula/formula.ts"
import type { Declared, Query } from "./query.ts"

export const START: Place = { offset: 0, line: 1, column: 1 }

const NUMBER = "number"

export const an = (word: string): string =>
  ["a", "e", "i", "o", "u"].includes(word[0] ?? "") ? `an ${word}` : `a ${word}`

export const answering = (holds: DeclaredType | null): string => {
  if (holds === null) return "absent and nothing else"
  return holds.kind === "list" ? `a list of ${holds.of}` : an(holds.kind)
}

export const refuseQuery = (message: string): Refused => ({
  ok: false,
  moment: "checking",
  message,
  at: START,
})

export const beyondSaid = (
  named: readonly string[],
  beyond: Readonly<Record<string, string>>
): string =>
  [...named]
    .sort()
    .map((key) => `\`${key}\` is declared to hold \`${beyond[key]}\`, which no formula holds`)
    .join("; ")

export const limitRefused = (query: Query): string | null => {
  const limit = query.limit
  if (limit === undefined) return null
  if (!Number.isInteger(limit)) {
    return `a \`limit\` is a whole number of pages, and this one states \`${limit}\``
  }
  if (limit < 0) {
    return `a \`limit\` is how many pages a query answers with, so it is never fewer than none, and this one states \`${limit}\``
  }
  return null
}

export const offsetRefused = (query: Query): string | null => {
  const offset = query.offset
  if (offset === undefined) return null
  if (!Number.isInteger(offset)) {
    return `an \`offset\` is a whole number of pages, and this one states \`${offset}\``
  }
  if (offset < 0) {
    return `an \`offset\` is how many pages a query passes over, so it is never fewer than none, and this one states \`${offset}\``
  }
  return null
}

export const reductionRefused = (query: Query, declared: Declared): string | null => {
  const how = query.function
  const target = query.target
  if (how === undefined && target === undefined) return null
  if (how === undefined) {
    return "a query stating a `target` states how it reduces it, and this one states no `function`"
  }
  if (target === undefined) {
    return "a query stating a `function` states the key it reduces, and this one states no `target`"
  }
  const beyond = declared.beyond[target]
  if (beyond !== undefined) {
    return `\`${target}\` is declared to hold \`${beyond}\`, which no reduction reduces`
  }
  const property = declared.properties[target]
  if (property === undefined) return `no page type this asks about declares \`${target}\``
  if (property.type.kind !== NUMBER) {
    return `a reduction reduces a number, and \`${target}\` holds ${answering(property.type)}`
  }
  return null
}
