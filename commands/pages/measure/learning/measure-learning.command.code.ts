import {
  everyTopic,
  type Topic,
  topicTreeIn,
} from "akasha/alan/library/book-of-everything/topic-tree/topic-tree.module.code.ts"
import type { Answer, Given } from "../../../modules/calling/calling.module.code.ts"
import { refused } from "../../../modules/calling/calling.module.code.ts"

const INPUT = 1

const DATA = 2

const JSON_SAID = "--json"

const SCALE = 7

const PLACES = 2

const GUTTER = 2

const COVERAGE_HEAD = "Coverage"

const TOPICS_HEAD = "Topics"

const NAME_HEAD = "Part"

export type Reading = {
  readonly title: string
  readonly coverage: number
  readonly topics: number
}

export function readingOf(topic: Topic): Reading {
  return {
    title: topic.title,
    coverage: Number(topic.coverage.toFixed(PLACES)),
    topics: everyTopic(topic).length,
  }
}

export function saidOf(parts: readonly Reading[], whole: Reading): readonly string[] {
  const every = [...parts, whole]
  const wideCoverage = Math.max(
    COVERAGE_HEAD.length,
    ...every.map((one) => one.coverage.toFixed(PLACES).length)
  )
  const wideTopics = Math.max(TOPICS_HEAD.length, ...every.map((one) => String(one.topics).length))
  const gutter = " ".repeat(GUTTER)
  const rowOf = (one: Reading): string => {
    const coverage = one.coverage.toFixed(PLACES).padStart(wideCoverage)
    const topics = String(one.topics).padStart(wideTopics)
    return `${coverage}${gutter}${topics}${gutter}${one.title}`
  }
  const heading =
    `${COVERAGE_HEAD.padStart(wideCoverage)}${gutter}` +
    `${TOPICS_HEAD.padStart(wideTopics)}${gutter}${NAME_HEAD}`
  return [
    `Book of Everything — how deep it goes, of ${SCALE}`,
    "",
    heading,
    ...parts.map(rowOf),
    "",
    rowOf(whole),
  ]
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
