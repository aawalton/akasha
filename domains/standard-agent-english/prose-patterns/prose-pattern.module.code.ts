import type { DepSentence, DepToken } from "@akasha/plain-language/dependency-graph"
import { child, childrenByRel, lower } from "@akasha/plain-language/dependency-graph"

export type Frame = "object" | "fronted" | "participle"

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

function boundTo(sentence: DepSentence, token: DepToken): boolean {
  return childrenByRel(sentence, token.id, OBLIQUE).some((one) =>
    childrenByRel(sentence, one.id, CASE).some((each) => lower(each) === TO)
  )
}

function frameOf(sentence: DepSentence, token: DepToken): Frame | null {
  if (token.upos !== VERB) return null
  if (childrenByRel(sentence, token.id, PARTICLE).length > 0) return null
  if (child(sentence, token.id, OBJECT) !== undefined) {
    return token.deprel === PARTICIPLE ? PARTICIPLE_FRAME : OBJECT_FRAME
  }
  if (boundTo(sentence, token)) return null
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
