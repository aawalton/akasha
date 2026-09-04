import { randomInt } from "node:crypto"
import {
  filterByStatus,
  type Leaf,
  type Rng,
  type StatusFilter,
  selectWithoutReplacement,
} from "@akasha/book-of-everything/random-leaf-select"
import { leavesOf, type Topic, topicAt, topicTreeIn } from "@akasha/book-of-everything/topic-tree"
import type { Answer, Given } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"

const INPUT = 1

const DATA = 2

const STATUS = "--status"

const COUNT = "--count"

const PART = "--part"

const SUBTREE = "--subtree"

const JSON_SAID = "--json"

const VALUED = [STATUS, COUNT, PART, SUBTREE]

const FILTERS: readonly StatusFilter[] = ["unopened", "resting", "any"]

const PARTS = 10

export type Taken = {
  readonly status: StatusFilter
  readonly count: number
  readonly part: number | null
  readonly subtree: string | null
  readonly json: boolean
}

export type Reading = Taken | { readonly refused: string }

function saidIn(
  argv: readonly string[]
):
  | { readonly held: ReadonlyMap<string, string>; readonly json: boolean }
  | { readonly refused: string } {
  const held = new Map<string, string>()
  let json = false
  let at = 0
  while (at < argv.length) {
    const one = argv[at] as string
    at += 1
    if (one === JSON_SAID) {
      json = true
      continue
    }
    if (!VALUED.includes(one)) return { refused: `\`${one}\` is nothing this takes` }
    const said = argv[at]
    at += 1
    if (said === undefined || said === "") {
      return { refused: `\`${one}\` takes a value, and this call names none after it` }
    }
    if (held.has(one))
      return { refused: `\`${one}\` is named twice, so which is meant is unsettled` }
    held.set(one, said)
  }
  return { held, json }
}

export function taken(argv: readonly string[]): Reading {
  const said = saidIn(argv)
  if ("refused" in said) return said
  const statusSaid = said.held.get(STATUS) ?? "unopened"
  const status = FILTERS.find((one) => one === statusSaid)
  if (status === undefined) {
    return {
      refused: `\`${STATUS}\` takes \`${FILTERS.join("`, `")}\`, and this call names \`${statusSaid}\``,
    }
  }
  const countSaid = said.held.get(COUNT)
  const count = countSaid === undefined ? 1 : Number(countSaid)
  if (!Number.isInteger(count) || count < 1) {
    return {
      refused: `\`${COUNT}\` takes a whole number of one or more, and this call names \`${countSaid ?? ""}\``,
    }
  }
  const partSaid = said.held.get(PART)
  const subtree = said.held.get(SUBTREE) ?? null
  if (partSaid !== undefined && subtree !== null) {
    return {
      refused: `\`${PART}\` and \`${SUBTREE}\` each say where to draw from, and both are named`,
    }
  }
  const part = partSaid === undefined ? null : Number(partSaid)
  if (part !== null && (!Number.isInteger(part) || part < 1 || part > PARTS)) {
    return {
      refused: `\`${PART}\` takes a number from 1 to ${PARTS}, and this call names \`${partSaid ?? ""}\``,
    }
  }
  return { status, count, part, subtree, json: said.json }
}

export function leafOf(topic: Topic): Leaf {
  return { path: topic.slug, label: topic.label, status: topic.status }
}

function scopeIn(tree: Topic, held: Taken): Topic | { readonly refused: string } {
  if (held.subtree !== null) {
    const found = topicAt(tree, held.subtree)
    return found ?? { refused: `\`${SUBTREE} ${held.subtree}\` names no topic` }
  }
  if (held.part === null) return tree
  const found = tree.children[held.part - 1]
  return found ?? { refused: `no part ${held.part} stands under the book` }
}

export function aliRandomLeaf(argv: readonly string[], given: Given): Answer {
  const held = taken(argv)
  if ("refused" in held) return refused(held.refused, INPUT)
  let tree: Topic
  try {
    tree = topicTreeIn(given.root)
  } catch (thrown) {
    return refused(thrown instanceof Error ? thrown.message : String(thrown), DATA)
  }
  const scope = scopeIn(tree, held)
  if ("refused" in scope) return refused(scope.refused, INPUT)
  const leaves = leavesOf(scope).map(leafOf)
  const candidates = filterByStatus(leaves, held.status)
  if (candidates.length === 0) {
    const where = held.subtree ?? (held.part === null ? "the whole book" : `part ${held.part}`)
    return refused(
      `nothing ${held.status} stands under ${where}, of ${leaves.length} leaves there`,
      DATA
    )
  }
  const rng: Rng = (bound) => randomInt(bound)
  const drawn = selectWithoutReplacement(candidates, held.count, rng)
  return {
    report: drawn.map((one) =>
      held.json ? JSON.stringify(one) : `${one.path}\t${one.label}\t${one.status}`
    ),
    refusals: [],
    code: 0,
  }
}
