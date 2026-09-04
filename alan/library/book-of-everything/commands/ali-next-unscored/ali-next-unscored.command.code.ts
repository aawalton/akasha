import { randomInt } from "node:crypto"
import {
  filterByStatus,
  type Leaf,
  type Rng,
  selectWithoutReplacement,
} from "@akasha/book-of-everything/random-leaf-select"
import { leavesOf, type Topic, topicAt, topicTreeIn } from "@akasha/book-of-everything/topic-tree"
import type { Answer, Given } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"

const INPUT = 1

const DATA = 2

const RANDOM = "--random"

const UNDER = "--under"

const JSON_SAID = "--json"

export type Taken = {
  readonly random: boolean
  readonly under: string | null
  readonly json: boolean
}

export type Reading = Taken | { readonly refused: string }

export function taken(argv: readonly string[]): Reading {
  let random = false
  let json = false
  let under: string | null = null
  let at = 0
  while (at < argv.length) {
    const one = argv[at] as string
    at += 1
    if (one === RANDOM) {
      random = true
      continue
    }
    if (one === JSON_SAID) {
      json = true
      continue
    }
    if (one !== UNDER) return { refused: `\`${one}\` is nothing this takes` }
    const said = argv[at]
    at += 1
    if (said === undefined || said === "") {
      return { refused: `\`${UNDER}\` names a topic, and this call names none after it` }
    }
    if (under !== null)
      return { refused: `\`${UNDER}\` is named twice, so which is meant is unsettled` }
    under = said
  }
  return { random, under, json }
}

export function leafOf(topic: Topic): Leaf {
  return { path: topic.slug, label: topic.label, status: topic.status }
}

export function aliNextUnscored(argv: readonly string[], given: Given): Answer {
  const held = taken(argv)
  if ("refused" in held) return refused(held.refused, INPUT)
  let scope: Topic
  try {
    const tree = topicTreeIn(given.root)
    const found = held.under === null ? tree : topicAt(tree, held.under)
    if (found === null) return refused(`\`${UNDER} ${held.under ?? ""}\` names no topic`, INPUT)
    scope = found
  } catch (thrown) {
    return refused(thrown instanceof Error ? thrown.message : String(thrown), DATA)
  }
  const leaves = leavesOf(scope).map(leafOf)
  const unopened = filterByStatus(leaves, "unopened")
  const picked = held.random
    ? selectWithoutReplacement(unopened, 1, ((bound) => randomInt(bound)) satisfies Rng)[0]
    : unopened[0]
  if (picked === undefined) {
    const where = held.under ?? "the whole book"
    return refused(`nothing unopened stands under ${where}, of ${leaves.length} leaves there`, DATA)
  }
  return {
    report: [
      held.json ? JSON.stringify(picked) : `${picked.path}\t${picked.label}\t${picked.status}`,
    ],
    refusals: [],
    code: 0,
  }
}
