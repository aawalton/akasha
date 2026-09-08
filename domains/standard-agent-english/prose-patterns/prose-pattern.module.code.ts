import type { DepSentence, DepToken } from "@akasha/plain-language/dependency-graph"
import { child, childrenByRel, hasChild, lower } from "@akasha/plain-language/dependency-graph"
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
  return childrenByRel(sentence, token.id, OBLIQUE).some((one) =>
    caseIs(sentence, one, new Set([TO]))
  )
}

function placedSomewhere(sentence: DepSentence, token: DepToken): boolean {
  return childrenByRel(sentence, token.id, OBLIQUE).some((one) => caseIs(sentence, one, PLACES))
}

function frameOf(sentence: DepSentence, token: DepToken): Frame | null {
  if (token.upos !== VERB) return null
  if (childrenByRel(sentence, token.id, PARTICLE).length > 0) return null
  if (boundTo(sentence, token)) return null
  if (hasChild(sentence, token.id, PASSIVE)) {
    return placedSomewhere(sentence, token) ? PLACED_FRAME : null
  }
  if (child(sentence, token.id, OBJECT) !== undefined) {
    return token.deprel === PARTICIPLE ? PARTICIPLE_FRAME : OBJECT_FRAME
  }
  return token.deprel === RELATIVE ? FRONTED_FRAME : null
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
