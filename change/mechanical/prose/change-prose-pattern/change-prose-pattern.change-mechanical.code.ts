import {
  type FileChange,
  refusing,
  type Said,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  bodyRestated,
  type Restating,
} from "akasha/change/modules/prose-splicing/prose-splicing.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import {
  type ProseAt,
  proseFrom,
  type Reach,
} from "akasha/domain/standard-agent-english/modules/prose-reach/prose-reach.module.code.ts"
import {
  type Parsing,
  type Passage,
  parsingNow,
  type Restatement,
  restatedIn,
} from "akasha/domain/standard-agent-english/modules/prose-restating/prose-restating.module.code.ts"
import type { Pattern } from "akasha/domain/standard-agent-english/modules/prose-rewrite/prose-rewrite.module.code.ts"
import {
  recordsIn,
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const PROSE = "standard-agent-english-property"

const RECORD = "record-property"

const WORDS = /[A-Za-z']+/g

export type Asked = {
  readonly spellings: readonly string[]
  readonly patterns: readonly Pattern[]
  readonly count?: number
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
  for (const record of recordsIn(value[at.key])) {
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

function restatingsBy(taken: readonly Restatement[]): ReadonlyMap<string, readonly Restating[]> {
  const found = new Map<string, Restating[]>()
  for (const one of taken) {
    const { passage } = one
    const restating = { key: passage.key, under: passage.under, was: passage.text, now: one.now }
    const held = found.get(passage.path)
    if (held === undefined) found.set(passage.path, [restating])
    else held.push(restating)
  }
  return found
}

export async function changeProsePattern(
  world: World,
  given: Asked,
  parsing: Parsing
): Promise<Said> {
  const plainest = given.spellings[0]
  if (plainest === undefined) return refusing("no spelling is handed in, so no passage is found")
  if (given.patterns.length === 0) {
    return refusing("no pair is handed in, so nothing says what is written instead")
  }
  const spellings = new Set(given.spellings)
  const said = await restatedIn(everyPassage(world, spellings), spellings, given.patterns, parsing)
  const taken = given.count === undefined ? said : said.slice(0, given.count)
  if (taken.length === 0) {
    return refusing(`no passage states \`${plainest}\` in a frame a pair names`)
  }
  const edits: FileChange[] = []
  for (const [path, held] of restatingsBy(taken)) {
    const text = world.textOf(path)
    if (text === null) return refusing(`\`${path}\` holds no body, so nothing is restated`)
    const answer = bodyRestated(path, text, held)
    if (answer.refused !== null) return refusing(`\`${path}\` is refused, and ${answer.refused}`)
    edits.push(...answer.edits)
  }
  return stating(edits)
}

export async function runChange(world: World, given: Asked): Promise<Said> {
  return await changeProsePattern(world, given, await parsingNow())
}
