import type { Test } from "../page-query-shape/page-query-shape.module.code.ts"

export const TEST_SAYS =
  "a test is either the value the key must hold, or a map stating `is`, `in`, `not-in`, `has`, `contains`, `ends-with`, `empty`, `at-or-after` or `before`"

function scalarText(value: unknown): string | null {
  if (typeof value === "string") return value
  if (typeof value === "number") return Number.isFinite(value) ? String(value) : null
  return typeof value === "boolean" ? String(value) : null
}

function textList(value: unknown): readonly string[] | null {
  const flat = scalarText(value)
  if (flat !== null) return [flat]
  if (!Array.isArray(value)) return null
  const out: string[] = []
  for (const each of value) {
    const text = scalarText(each)
    if (text === null) return null
    out.push(text)
  }
  return out
}

const TEXT_SLOTS: Readonly<Record<string, string>> = {
  is: "is",
  has: "has",
  "ends-with": "endsWith",
  "at-or-after": "atOrAfter",
  before: "before",
}

const LIST_SLOTS: Readonly<Record<string, string>> = {
  in: "in",
  "not-in": "notIn",
  contains: "contains",
}

export function testOf(key: string, value: unknown): Test | null {
  const flat = scalarText(value)
  if (flat !== null) return { key, is: flat }
  if (typeof value !== "object" || value === null || Array.isArray(value)) return null
  const test: Record<string, unknown> = { key }
  for (const [slot, stated] of Object.entries(value as Record<string, unknown>)) {
    const asText = TEXT_SLOTS[slot]
    if (asText !== undefined) {
      const text = scalarText(stated)
      if (text === null) return null
      test[asText] = text
      continue
    }
    const asList = LIST_SLOTS[slot]
    if (asList !== undefined) {
      const list = textList(stated)
      if (list === null) return null
      test[asList] = list
      continue
    }
    if (slot !== "empty") return null
    if (stated !== true && stated !== false && stated !== "true" && stated !== "false") return null
    test.empty = stated === true || stated === "true"
  }
  return Object.keys(test).length === 1 ? null : (test as unknown as Test)
}

export interface Narrowed {
  readonly where?: readonly Test[]
  readonly unreadable: readonly string[]
}

export function narrowed(where: unknown): Narrowed {
  if (where === undefined) return { unreadable: [] }
  if (typeof where !== "object" || where === null || Array.isArray(where)) {
    const shape = Array.isArray(where) ? "a list" : `a ${where === null ? "null" : typeof where}`
    return {
      unreadable: [
        `\`where\` states ${shape}, and a \`where\` is a map from a key to the test on it; ${TEST_SAYS}`,
      ],
    }
  }
  const tests: Test[] = []
  const unreadable: string[] = []
  for (const [key, one] of Object.entries(where as Record<string, unknown>)) {
    const test = testOf(key, one)
    if (test === null) {
      unreadable.push(`\`where\` on \`${key}\` states no test this service can read; ${TEST_SAYS}`)
    } else tests.push(test)
  }
  return { where: tests, unreadable }
}
