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
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import {
  DATA,
  refused,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { alanLearnNext as page } from "akasha/commands/pages/alan/learn-next/alan-learn-next.command.ts"

const UNOPENED = "unopened"

const SEED = 1618033988

function leafOf(topic: Topic): Leaf {
  return { path: topic.slug, label: topic.label, status: topic.status }
}

export function sweepOf(leaves: readonly Leaf[]): readonly Leaf[] {
  return selectWithoutReplacement(leaves, leaves.length, drawsFromSeed(SEED))
}

export function alanLearnNext(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [json])
  if ("refused" in read) return refusedBy(read.refused)
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
  return told([
    read.taken.json ? JSON.stringify(next) : `${next.path}\t${next.label}\t${next.status}`,
  ])
}
