import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { changeProsePattern as changeProsePatternMechanical } from "akasha/change/mechanical/prose/change-prose-pattern/change-prose-pattern.change-mechanical.ts"
import {
  type Answer,
  missing,
  refusing,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import type { Pattern } from "akasha/domain/standard-agent-english/modules/prose-rewrite/prose-rewrite.module.code.ts"
import {
  recordsIn,
  slugOf,
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const BANNED_TERM = "banned-term"

const RESTATES = `${changeMechanical.slug}/${changeProsePatternMechanical.slug}` as const

const TERM = "term"

const COUNT = "count"

const WHOLE = /^\d+$/

export type ChangeProsePatternAsked = {
  readonly term: string
  readonly count?: number
}

function noCount(said: string): string {
  return `\`${COUNT}\` counts passages to restate, and \`${said}\` is no whole number above nothing`
}

export function patternsIn(value: Value): readonly Pattern[] {
  const found: Pattern[] = []
  for (const one of recordsIn(value["replacementPatterns"])) {
    const frame = textAt(one, "frame")
    const fromPattern = textAt(one, "fromPattern")
    const toPattern = textAt(one, "toPattern")
    if (frame === null || fromPattern === null || toPattern === null) continue
    found.push({ frame: slugOf(frame) as Pattern["frame"], fromPattern, toPattern })
  }
  return found
}

export function spellingsIn(value: Value): readonly string[] {
  const found = new Set<string>()
  const spelling = textAt(value, "spelling")
  if (spelling !== null) found.add(spelling.toLowerCase())
  const held = value["variants"]
  for (const one of Array.isArray(held) ? held : []) {
    if (typeof one === "string") found.add(one.toLowerCase())
  }
  return [...found]
}

export async function changeProsePattern(
  world: World,
  given: ChangeProsePatternAsked
): Promise<Answer> {
  const count = given.count
  if (count !== undefined && (!Number.isInteger(count) || count < 1)) {
    return refusing(noCount(String(count)))
  }
  const term = world.index.pageAt(BANNED_TERM, given.term)
  if (term === null) return refusing(`\`${given.term}\` names no banned term`)
  const patterns = patternsIn(term)
  if (patterns.length === 0) {
    return refusing(`\`${given.term}\` names no pair, so nothing says what is written instead`)
  }
  const spellings = spellingsIn(term)
  if (count === undefined) {
    return (await reach(world, RESTATES, { spellings, patterns })).said
  }
  return (await reach(world, RESTATES, { spellings, patterns, count })).said
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [TERM, COUNT]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const term = given[TERM]
  if (term === undefined) return refusing(missing(TERM))
  const counted = given[COUNT]
  if (counted !== undefined && !WHOLE.test(counted)) return refusing(noCount(counted))
  if (counted === undefined) return await changeProsePattern(world, { term })
  return await changeProsePattern(world, { term, count: Number(counted) })
}
