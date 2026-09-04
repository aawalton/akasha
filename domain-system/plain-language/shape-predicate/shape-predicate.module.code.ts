import type { DepSentence } from "../dependency-graph/dependency-graph.module.code.ts"

export type Match = {
  readonly at: readonly number[]
}

export type ShapePredicate = (sentence: DepSentence) => readonly Match[]
