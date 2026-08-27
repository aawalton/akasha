import { COMPARISONS, type Field, NEGATIONS } from "../set/set.ts"

export interface Condition {
  readonly field: string
  readonly test: string
  readonly negated: boolean
  readonly values: readonly string[]
}

export interface Match {
  readonly conditions: readonly Condition[]
  readonly stray: number
}

interface Spelling {
  readonly test: string
  readonly negated: boolean
}

const VALUE = /^\s+-\s+`(.*)`\s*$/

const HEADING = /^#\s/

const MATCH = "# Match"

function spellingsOf(fields: readonly Field[]): Map<string, Spelling> {
  const table = new Map<string, Spelling>()
  for (const field of fields) {
    for (const test of COMPARISONS[field.type]) {
      table.set(test, { test, negated: false })
      const negated = NEGATIONS[test]
      if (negated !== undefined) table.set(negated, { test, negated: true })
    }
  }
  return table
}

export function parseMatch(fields: readonly Field[], body: string): Match {
  const spellings = spellingsOf(fields)
  const names = fields.map((one) => one.name).join("|")
  const ordered = [...spellings.keys()].sort((one, other) => other.length - one.length).join("|")
  const stated = new RegExp(`^-\\s+\\*\\*(${names})\\*\\*\\s+(${ordered})\\s*$`)

  const lines = body.replace(/\r\n/g, "\n").split("\n")
  const start = lines.findIndex((line) => line.trim() === MATCH)
  if (start === -1) return { conditions: [], stray: 0 }
  const found: { field: string; test: string; negated: boolean }[] = []
  const values: string[][] = []
  let stray = 0
  for (const line of lines.slice(start + 1)) {
    if (HEADING.test(line)) break
    if (line.trim() === "") continue
    const asCondition = stated.exec(line)
    const spelling = asCondition === null ? undefined : spellings.get(asCondition[2] ?? "")
    if (asCondition !== null && spelling !== undefined) {
      found.push({ field: asCondition[1] ?? "", test: spelling.test, negated: spelling.negated })
      values.push([])
      continue
    }
    const asValue = VALUE.exec(line)
    if (asValue !== null && values.length > 0) {
      values[values.length - 1]?.push(asValue[1] ?? "")
      continue
    }
    stray += 1
  }
  return { conditions: found.map((one, at) => ({ ...one, values: values[at] ?? [] })), stray }
}

export function comparisonsFor(fields: readonly Field[], name: string): readonly string[] {
  const type = fields.find((one) => one.name === name)?.type
  return type === undefined ? [] : COMPARISONS[type]
}

export function mispaired(
  fields: readonly Field[],
  conditions: readonly Condition[]
): readonly Condition[] {
  return conditions.filter((one) => !comparisonsFor(fields, one.field).includes(one.test))
}
