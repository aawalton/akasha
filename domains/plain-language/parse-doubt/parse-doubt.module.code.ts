import type { DepSentence } from "../dependency-graph/dependency-graph.module.code.ts"
import { hasChild, rootOf } from "../dependency-graph/dependency-graph.module.code.ts"

const SUBJECT = ["nsubj", "csubj"]

const NO_ROOT = "the parse names no root"

export function doubtsIn(sentence: DepSentence): readonly string[] {
  const root = rootOf(sentence)
  if (root === undefined) return [NO_ROOT]
  if (SUBJECT.some((rel) => hasChild(sentence, root.id, rel))) return []
  return [`the root \`${root.form}\` carries no subject`]
}

export function isSound(sentence: DepSentence): boolean {
  return doubtsIn(sentence).length === 0
}
