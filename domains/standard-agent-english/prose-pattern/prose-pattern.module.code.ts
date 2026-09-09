import type { DepSentence, DepToken } from "@akasha/plain-language/dependency-graph"
import {
  byId,
  child,
  childrenByRel,
  hasChild,
  lower,
  subtree,
} from "@akasha/plain-language/dependency-graph"
import type { Frame } from "../terms/banned-terms/properties/prose-frame.relation-property.ts"

export type Found = {
  readonly at: number
  readonly start: number
  readonly end: number
  readonly frame: Frame
}

const VERB = "VERB"

const OBJECT = "obj"

const OBLIQUE = "obl"

const CASE = "case"

const PARTICLE = "compound:prt"

const RELATIVE = "acl:relcl"

const PARTICIPLE = "acl"

const FIRST = 1

const TO = "to"

const OBJECT_FRAME = "object"

const FRONTED_FRAME = "fronted"

const PARTICIPLE_FRAME = "participle"

const PLACED_FRAME = "placed"

const PASSIVE = "aux:pass"

const SUBJECT = "nsubj"

const ADVERB = "advmod"

const MARK = "mark"

const MODIFIER = "nmod"

const CONJUNCT = "conj"

const CLAUSAL_SUBJECT = "csubj"

const CLAUSE_OF_ITS_OWN = "advcl"

const COORDINATOR = "cc"

const AUXILIARY = "aux"

const PREPOSITION = "ADP"

const RATHER = "rather"

const NOUN = "NOUN"

const COMPOUND = "compound"

const APPOSITION = "appos"

const ASKING: ReadonlySet<string> = new Set([
  "how",
  "whether",
  "why",
  "when",
  "where",
  "which",
  "what",
])

const TOWARD: ReadonlySet<string> = new Set([TO])

const DIRECTED: ReadonlySet<string> = new Set([
  TO,
  "into",
  "onto",
  "from",
  "toward",
  "towards",
  "across",
  "between",
  "past",
  "beyond",
  "over",
])

const HAVING: ReadonlySet<string> = new Set(["has", "have", "had"])

const PREPOSITIONAL: ReadonlySet<string> = new Set([PREPOSITION, "SCONJ"])

const SELVES: ReadonlySet<string> = new Set([
  "itself",
  "themselves",
  "himself",
  "herself",
  "myself",
  "ourselves",
  "yourself",
  "yourselves",
  "oneself",
])

const PAST = /(ed|en)$/i

const ING = /ing$/i

const BEING: ReadonlySet<string> = new Set([
  "am",
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "being",
])

const THINGS: ReadonlySet<string> = new Set(["NOUN", "PROPN"])

const NAMED: ReadonlySet<string> = new Set(["NOUN", "PROPN", "PRON"])

const RELATIVIZERS: ReadonlySet<string> = new Set(["that", "which", "who", "whom"])

const PERSONS: ReadonlySet<string> = new Set([
  "anyone",
  "everyone",
  "i",
  "me",
  "someone",
  "us",
  "we",
  "what",
  "whatever",
  "who",
  "whoever",
  "whom",
  "you",
])

const PARTICLES: ReadonlySet<string> = new Set([
  "apart",
  "back",
  "down",
  "forward",
  "off",
  "out",
  "over",
  "through",
  "together",
  "under",
  "up",
])

const PLACES: ReadonlySet<string> = new Set([
  "in",
  "on",
  "at",
  "under",
  "beside",
  "inside",
  "within",
])

function caseIs(sentence: DepSentence, one: DepToken, among: ReadonlySet<string>): boolean {
  return childrenByRel(sentence, one.id, CASE).some((each) => among.has(lower(each)))
}

function boundTo(sentence: DepSentence, token: DepToken): boolean {
  if (childrenByRel(sentence, token.id, OBLIQUE).some((one) => caseIs(sentence, one, DIRECTED))) {
    return true
  }
  const object = child(sentence, token.id, OBJECT)
  if (object === undefined) return false
  return childrenByRel(sentence, object.id, MODIFIER).some((one) => caseIs(sentence, one, TOWARD))
}

function placedSomewhere(sentence: DepSentence, token: DepToken): boolean {
  return childrenByRel(sentence, token.id, OBLIQUE).some((one) => caseIs(sentence, one, PLACES))
}

function particleUnder(sentence: DepSentence, id: number): boolean {
  if (childrenByRel(sentence, id, ADVERB).some((one) => PARTICLES.has(lower(one)))) return true
  return childrenByRel(sentence, id, COMPOUND).some((one) => PARTICLES.has(lower(one)))
}

function particled(sentence: DepSentence, token: DepToken): boolean {
  if (childrenByRel(sentence, token.id, PARTICLE).length > 0) return true
  if (particleUnder(sentence, token.id)) return true
  const next = byId(sentence, token.id + 1)
  if (next !== undefined && PARTICLES.has(lower(next))) return true
  const object = child(sentence, token.id, OBJECT)
  if (object === undefined) return false
  const after = byId(sentence, object.id + 1)
  if (after !== undefined && PARTICLES.has(lower(after)) && after.deprel !== CASE) return true
  return particleUnder(sentence, object.id)
}

function subjectOfItsOwn(sentence: DepSentence, token: DepToken): boolean {
  const own = childrenByRel(sentence, token.id, SUBJECT)
  if (own.length > 0) return own.some((one) => !RELATIVIZERS.has(lower(one)))
  const near = byId(sentence, token.id - 1)
  if (near === undefined || !THINGS.has(near.upos)) return false
  if (near.deprel === COMPOUND && near.head === token.id) return true
  return near.deprel === APPOSITION || near.deprel === SUBJECT
}

function personHeld(sentence: DepSentence, token: DepToken): boolean {
  return childrenByRel(sentence, token.id, SUBJECT).some((one) => PERSONS.has(lower(one)))
}

function underAPreposition(sentence: DepSentence, token: DepToken): boolean {
  return hasChild(sentence, token.id, MARK) || hasChild(sentence, token.id, CASE)
}

function thingFronted(sentence: DepSentence, token: DepToken): boolean {
  const above = byId(sentence, token.head)
  return above !== undefined && THINGS.has(above.upos)
}

function pastAfter(sentence: DepSentence, token: DepToken): boolean {
  const next = byId(sentence, token.id + 1)
  return next !== undefined && next.upos === VERB && PAST.test(next.form)
}

function havingBeside(sentence: DepSentence, token: DepToken): boolean {
  const next = byId(sentence, token.id + 1)
  if (next !== undefined && HAVING.has(lower(next))) return true
  return childrenByRel(sentence, token.id, AUXILIARY).some((one) => HAVING.has(lower(one)))
}

function setAgainst(sentence: DepSentence, token: DepToken): boolean {
  return childrenByRel(sentence, token.id, CONJUNCT).some(
    (one) =>
      one.upos === VERB &&
      childrenByRel(sentence, one.id, COORDINATOR).some((each) => lower(each) === RATHER)
  )
}

function strandedOn(sentence: DepSentence, token: DepToken): boolean {
  return childrenByRel(sentence, token.id, ADVERB).some(
    (one) => one.upos === PREPOSITION && one.id > token.id
  )
}

function selfHeld(sentence: DepSentence, token: DepToken): boolean {
  const object = child(sentence, token.id, OBJECT)
  return object !== undefined && SELVES.has(lower(object))
}

function directed(one: DepToken | undefined): boolean {
  return one !== undefined && PREPOSITIONAL.has(one.upos) && DIRECTED.has(lower(one))
}

function afterAll(sentence: DepSentence, token: DepToken): DepToken | undefined {
  const ids = subtree(sentence, token.id).map((one) => one.id)
  return byId(sentence, Math.max(...ids) + 1)
}

function sentOn(sentence: DepSentence, token: DepToken): boolean {
  const object = child(sentence, token.id, OBJECT)
  if (object === undefined) return false
  if (caseIs(sentence, object, DIRECTED)) return true
  if (directed(byId(sentence, object.id + 1))) return true
  return directed(afterAll(sentence, object))
}

function adverbBefore(sentence: DepSentence, token: DepToken): boolean {
  return childrenByRel(sentence, token.id, ADVERB).some((one) => one.id < token.id)
}

function clauseBeside(sentence: DepSentence, token: DepToken): boolean {
  return childrenByRel(sentence, token.head, PARTICIPLE).some(
    (one) => one.id > token.id && one.upos === VERB
  )
}

function verbConjoined(sentence: DepSentence, token: DepToken): boolean {
  return childrenByRel(sentence, token.id, CONJUNCT).some((one) => one.upos === VERB)
}

function beBeside(sentence: DepSentence, token: DepToken): boolean {
  return childrenByRel(sentence, token.id, AUXILIARY).some((one) => BEING.has(lower(one)))
}

function joined(sentence: DepSentence, token: DepToken): boolean {
  return token.deprel === CONJUNCT || hasChild(sentence, token.id, CONJUNCT)
}

function participleOf(sentence: DepSentence, token: DepToken): Frame | null {
  if (token.id === FIRST) return null
  if (token.deprel === CLAUSAL_SUBJECT) return null
  if (token.deprel === CLAUSE_OF_ITS_OWN) return null
  if (underAPreposition(sentence, token)) return null
  if (adverbBefore(sentence, token)) return null
  if (clauseBeside(sentence, token)) return null
  if (beBeside(sentence, token)) return null
  return joined(sentence, token) ? null : PARTICIPLE_FRAME
}

function objectAsked(sentence: DepSentence, token: DepToken): boolean {
  const object = child(sentence, token.id, OBJECT)
  if (object === undefined) return false
  return subtree(sentence, object.id).some((one) => one.id < object.id && ASKING.has(lower(one)))
}

function acting(sentence: DepSentence, token: DepToken): boolean {
  if (token.upos === VERB) return true
  if (token.upos !== NOUN) return false
  return token.deprel === RELATIVE || hasChild(sentence, token.id, OBJECT)
}

function objectsDoubled(sentence: DepSentence, token: DepToken): boolean {
  const named = childrenByRel(sentence, token.id, OBJECT).filter((one) => NAMED.has(one.upos))
  return named.length > 1
}

function relativizerHeld(sentence: DepSentence, token: DepToken): boolean {
  const object = child(sentence, token.id, OBJECT)
  if (object === undefined || !RELATIVIZERS.has(lower(object))) return false
  return childrenByRel(sentence, token.id, SUBJECT).length === 0
}

function objectUnnamed(sentence: DepSentence, token: DepToken): boolean {
  const object = child(sentence, token.id, OBJECT)
  return object !== undefined && !NAMED.has(object.upos)
}

function leftAlone(sentence: DepSentence, token: DepToken): boolean {
  if (objectsDoubled(sentence, token)) return true
  if (objectUnnamed(sentence, token)) return true
  if (relativizerHeld(sentence, token)) return true
  if (particled(sentence, token)) return true
  if (personHeld(sentence, token)) return true
  if (boundTo(sentence, token)) return true
  if (havingBeside(sentence, token)) return true
  if (setAgainst(sentence, token)) return true
  if (strandedOn(sentence, token)) return true
  if (selfHeld(sentence, token)) return true
  if (objectAsked(sentence, token)) return true
  return sentOn(sentence, token)
}

function frameOf(sentence: DepSentence, token: DepToken): Frame | null {
  if (!acting(sentence, token)) return null
  if (leftAlone(sentence, token)) return null
  if (hasChild(sentence, token.id, PASSIVE)) {
    return placedSomewhere(sentence, token) ? PLACED_FRAME : null
  }
  if (child(sentence, token.id, OBJECT) !== undefined) {
    if (token.deprel === PARTICIPLE || ING.test(token.form)) return participleOf(sentence, token)
    return pastAfter(sentence, token) ? null : OBJECT_FRAME
  }
  if (token.deprel !== RELATIVE) return null
  if (placedSomewhere(sentence, token)) return null
  if (!thingFronted(sentence, token)) return null
  if (pastAfter(sentence, token)) return null
  if (verbConjoined(sentence, token)) return null
  return subjectOfItsOwn(sentence, token) ? FRONTED_FRAME : null
}

export function foundIn(sentence: DepSentence, spellings: ReadonlySet<string>): readonly Found[] {
  const found: Found[] = []
  for (const token of sentence.tokens) {
    if (!spellings.has(lower(token))) continue
    const frame = frameOf(sentence, token)
    if (frame === null) continue
    found.push({ at: token.id, start: token.start, end: token.end, frame })
  }
  return found
}
