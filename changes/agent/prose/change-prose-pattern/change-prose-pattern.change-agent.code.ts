import { textAt, type Value } from "@akasha/pages/page-value"
import {
  type ProseAt,
  proseFrom,
  type Reach,
} from "akasha/domains/standard-agent-english/prose-reach/prose-reach.module.code.ts"
import {
  type Parsing,
  type Passage,
  parsingNow,
  type Restatement,
  restatedIn,
} from "akasha/domains/standard-agent-english/prose-restating/prose-restating.module.code.ts"
import type { Pattern } from "akasha/domains/standard-agent-english/prose-rewrite/prose-rewrite.module.code.ts"
import { gathered, missing, refusing } from "../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/answer/change-answer.module.types.ts"
import {
  isLedger,
  ledgerAt,
  reach,
  type World,
} from "../../../modules/shadow/change-shadow.module.code.ts"

const BANNED_TERM = "banned-term"

const PROSE = "standard-agent-english-property"

const RECORD = "record-property"

const RESTATES = "change-mechanical-file-content/change-page-page-property"

const RESTATES_FIELD = "change-mechanical-file-content/change-property-record-field"

const TERM = "term"

const COUNT = "count"

const WHOLE = /^\d+$/

const WORDS = /[A-Za-z']+/g

export type ChangeProsePatternAsked = {
  readonly term: string
  readonly count?: number
}

function noCount(said: string): string {
  return `\`${COUNT}\` counts passages to restate, and \`${said}\` is no whole number above nothing`
}

function recordsIn(value: Value, key: string): readonly Value[] {
  const held = value[key]
  if (!Array.isArray(held)) return []
  return held.filter(
    (one): one is Value => typeof one === "object" && one !== null && !Array.isArray(one)
  )
}

export function patternsIn(value: Value): readonly Pattern[] {
  const found: Pattern[] = []
  for (const one of recordsIn(value, "replacementPatterns")) {
    const frame = textAt(one, "frame")
    const fromPattern = textAt(one, "fromPattern")
    const toPattern = textAt(one, "toPattern")
    if (frame === null || fromPattern === null || toPattern === null) continue
    found.push({ frame: frame as Pattern["frame"], fromPattern, toPattern })
  }
  return found
}

export function spellingsIn(value: Value): ReadonlySet<string> {
  const found = new Set<string>()
  const spelling = textAt(value, "spelling")
  if (spelling !== null) found.add(spelling.toLowerCase())
  const held = value["variants"]
  for (const one of Array.isArray(held) ? held : []) {
    if (typeof one === "string") found.add(one.toLowerCase())
  }
  return found
}

export function spelt(text: string, spellings: ReadonlySet<string>): boolean {
  for (const match of text.matchAll(WORDS)) {
    if (spellings.has(match[0].toLowerCase())) return true
  }
  return false
}

export function passagesAt(value: Value, path: string, at: ProseAt): readonly Passage[] {
  const found: Passage[] = []
  const field = at.under[at.under.length - 1]
  if (field === undefined) {
    const text = textAt(value, at.key)
    if (text !== null) found.push({ path, key: at.key, under: at.under, text })
    return found
  }
  if (at.under.length > 1) return found
  for (const record of recordsIn(value, at.key)) {
    const text = textAt(record, field)
    if (text !== null) found.push({ path, key: at.key, under: at.under, text })
  }
  return found
}

function reachOf(world: World): Reach {
  return {
    prose: world.index.kindsUnder(PROSE),
    record: world.index.kindsUnder(RECORD),
    source: world.index.sourceIn(),
    fieldsOf: (one) => {
      const value = world.index.pageAt(one.pageTypeSlug, one.pagePropertySlug)
      return value === null ? [] : world.index.carriedIn(value, one.pagePropertySlug)
    },
  }
}

function everyPassage(world: World, spellings: ReadonlySet<string>): readonly Passage[] {
  const found: Passage[] = []
  const held = reachOf(world)
  for (const pageTypeSlug of [...world.index.pageTypesIn()].sort()) {
    const at = proseFrom(pageTypeSlug, held)
    if (at.length === 0) continue
    for (const listed of world.index.everyOfType(pageTypeSlug)) {
      const value = world.index.pageByPath(listed.path)
      if (value === null) continue
      for (const one of at) {
        for (const passage of passagesAt(value, listed.path, one)) {
          if (spelt(passage.text, spellings)) found.push(passage)
        }
      }
    }
  }
  return found
}

async function landed(world: World, one: Restatement) {
  const { passage, now } = one
  const field = passage.under[passage.under.length - 1]
  if (field === undefined) {
    return await reach(world, RESTATES, { at: passage.path, key: passage.key, to: now })
  }
  return await reach(world, RESTATES_FIELD, {
    at: passage.path,
    key: passage.key,
    where: field,
    is: passage.text,
    field,
    to: now,
  })
}

export async function changeProsePattern(
  world: World,
  given: ChangeProsePatternAsked,
  parsing: Parsing
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
  const said = await restatedIn(everyPassage(world, spellings), spellings, patterns, parsing)
  const taken = count === undefined ? said : said.slice(0, count)
  if (taken.length === 0) {
    return refusing(`no passage states \`${given.term}\` in a frame a pair names`)
  }
  const answers: Answer[] = []
  let over: World = isLedger(world)
    ? world
    : ledgerAt(world.root, world.bodyOf, world.reaching, world.textOf)
  for (const one of taken) {
    const reached = await landed(over, one)
    if (reached.said.refused !== null) {
      return refusing(`\`${one.passage.path}\` is refused, and ${reached.said.refused}`)
    }
    over = reached.world
    answers.push(reached.said)
  }
  return gathered(answers)
}

export type Asked = Readonly<Record<string, string>>

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const term = given[TERM]
  if (term === undefined) return refusing(missing(TERM))
  const counted = given[COUNT]
  if (counted !== undefined && !WHOLE.test(counted)) return refusing(noCount(counted))
  const parsing = await parsingNow()
  if (counted === undefined) return await changeProsePattern(world, { term }, parsing)
  return await changeProsePattern(world, { term, count: Number(counted) }, parsing)
}
