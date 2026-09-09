import {
  drawsFromSeed,
  type Leaf,
  selectWithoutReplacement,
} from "akasha/alan/library/book-of-everything/seeded-draw/seeded-draw.module.code.ts"
import {
  leavesOf,
  type Topic,
  topicTreeIn,
} from "akasha/alan/library/book-of-everything/topic-tree/topic-tree.module.code.ts"
import type { Answer, Given } from "../../../modules/calling/calling.module.code.ts"
import { refused } from "../../../modules/calling/calling.module.code.ts"

const INPUT = 1

const DATA = 2

const JSON_SAID = "--json"

const UNOPENED = "unopened"

const SEED = 1618033988

export function leafOf(topic: Topic): Leaf {
  return { path: topic.slug, label: topic.label, status: topic.status }
}

export function sweepOf(leaves: readonly Leaf[]): readonly Leaf[] {
  return selectWithoutReplacement(leaves, leaves.length, drawsFromSeed(SEED))
}

export function alanLearnNext(argv: readonly string[], given: Given): Answer {
  let json = false
  for (const one of argv) {
    if (one !== JSON_SAID) return refused(`\`${one}\` is nothing this takes`, INPUT)
    json = true
  }
  let tree: Topic
  try {
    tree = topicTreeIn(given.root)
  } catch (thrown) {
    return refused(thrown instanceof Error ? thrown.message : String(thrown), DATA)
  }
  const leaves = leavesOf(tree).map(leafOf)
  const next = sweepOf(leaves).find((one) => one.status === UNOPENED)
  if (next === undefined) {
    return refused(`every one of the ${leaves.length} leaves of the book is opened`, DATA)
  }
  return {
    report: [json ? JSON.stringify(next) : `${next.path}\t${next.label}\t${next.status}`],
    refusals: [],
    code: 0,
  }
}
