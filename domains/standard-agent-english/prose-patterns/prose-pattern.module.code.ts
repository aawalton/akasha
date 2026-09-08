import type { DepSentence, DepToken } from "@akasha/plain-language/dependency-graph"
import {
  byId,
  child,
  childrenByRel,
  hasChild,
  lower,
} from "@akasha/plain-language/dependency-graph"
import type { Frame } from "../banned-terms/properties/prose-frame.relation-property.ts"

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

const TOWARD: ReadonlySet<string> = new Set([TO])

const PAST = /ed$/i

const THINGS: ReadonlySet<string> = new Set(["NOUN", "PROPN"])

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
  if (childrenByRel(sentence, token.id, OBLIQUE).some((one) => caseIs(sentence, one, TOWARD))) {
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
  return childrenByRel(sentence, id, ADVERB).some((one) => PARTICLES.has(lower(one)))
}

function particled(sentence: DepSentence, token: DepToken): boolean {
  if (childrenByRel(sentence, token.id, PARTICLE).length > 0) return true
  if (particleUnder(sentence, token.id)) return true
  const next = byId(sentence, token.id + 1)
  if (next !== undefined && PARTICLES.has(lower(next))) return true
  const object = child(sentence, token.id, OBJECT)
  return object !== undefined && particleUnder(sentence, object.id)
}

function subjectOfItsOwn(sentence: DepSentence, token: DepToken): boolean {
  return childrenByRel(sentence, token.id, SUBJECT).some((one) => !RELATIVIZERS.has(lower(one)))
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

function frameOf(sentence: DepSentence, token: DepToken): Frame | null {
  if (token.upos !== VERB) return null
  if (particled(sentence, token)) return null
  if (personHeld(sentence, token)) return null
  if (boundTo(sentence, token)) return null
  if (hasChild(sentence, token.id, PASSIVE)) {
    return placedSomewhere(sentence, token) ? PLACED_FRAME : null
  }
  if (child(sentence, token.id, OBJECT) !== undefined) {
    if (token.deprel === PARTICIPLE) {
      return underAPreposition(sentence, token) ? null : PARTICIPLE_FRAME
    }
    return pastAfter(sentence, token) ? null : OBJECT_FRAME
  }
  if (token.deprel !== RELATIVE) return null
  if (!thingFronted(sentence, token)) return null
  if (pastAfter(sentence, token)) return null
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
