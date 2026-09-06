import { type Topic, topicTreeIn } from "@akasha/book-of-everything/topic-tree"
import type { Answer, Given } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"

const INPUT = 1

const DATA = 2

const JSON_SAID = "--json"

const SCALE = 7

const PLACES = 2

export type Reading = {
  readonly title: string
  readonly coverage: number
}

export function readingOf(topic: Topic): Reading {
  return { title: topic.title, coverage: Number(topic.coverage.toFixed(PLACES)) }
}

export function saidOf(parts: readonly Reading[], whole: Reading): readonly string[] {
  const lines: string[] = ["| Part | Coverage |", "| --- | --- |"]
  for (const one of [...parts, whole]) {
    lines.push(`| ${one.title} | ${one.coverage.toFixed(PLACES)} of ${SCALE} |`)
  }
  return lines
}

export function measureLearning(argv: readonly string[], given: Given): Answer {
  const stray = argv.find((one) => one !== JSON_SAID)
  if (stray !== undefined) return refused(`\`${stray}\` is nothing this takes`, INPUT)
  let tree: Topic
  try {
    tree = topicTreeIn(given.root)
  } catch (thrown) {
    return refused(thrown instanceof Error ? thrown.message : String(thrown), DATA)
  }
  const parts = tree.children.map(readingOf)
  const whole = readingOf(tree)
  return {
    report: argv.includes(JSON_SAID)
      ? [JSON.stringify({ scale: SCALE, parts, whole })]
      : [...saidOf(parts, whole)],
    refusals: [],
    code: 0,
  }
}
