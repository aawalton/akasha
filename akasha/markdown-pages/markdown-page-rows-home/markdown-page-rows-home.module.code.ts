import { pageStemOf } from "@akasha/pages-system/markdown-page-name"
import type { FileTree } from "../markdown-file-tree/markdown-file-tree.module.code.ts"
import { slugNamed } from "../markdown-page-address/markdown-page-address.module.code.ts"
import {
  DEFINED_ON,
  PROPERTY_GLOBS,
} from "../markdown-page-types/markdown-page-types.module.code.ts"
import { answeredWhole } from "../markdown-property-answer-cache/markdown-property-answer-cache.module.code.ts"
import { shapeMarkOf } from "../markdown-shape-mark/markdown-shape-mark.module.code.ts"
import { blockOf, stringAt } from "../markdown-text-at/markdown-text-at.module.code.ts"

export const PAGES = "pages"

export const JSONL = "jsonl"

const UNCOMMITTED = "uncommitted"

const APPEND_ONLY = "append-only"

export interface RowsHome {
  readonly target: string
  readonly parentType: string
  readonly key: string
  readonly uncommitted: boolean
  readonly appendOnly: boolean
}

function homeIn(relPath: string, text: string): RowsHome | null {
  const { fm, why } = blockOf(text)
  if (why !== null) return null
  if (stringAt(fm, "type") !== PAGES || stringAt(fm, "rows") !== JSONL) return null
  const target = stringAt(fm, "target-slug")
  const on = stringAt(fm, DEFINED_ON)
  if (target === null || on === null) return null
  return {
    parentType: slugNamed(on),
    key: stringAt(fm, "key") ?? pageStemOf(relPath),
    uncommitted: stringAt(fm, UNCOMMITTED) === "true",
    appendOnly: stringAt(fm, APPEND_ONLY) === "true",
    target,
  }
}

function homesIn(tree: FileTree): ReadonlyMap<string, readonly RowsHome[]> {
  const said: RowsHome[] = []
  for (const relPath of tree.paths(PROPERTY_GLOBS)) {
    const text = tree.open(relPath)
    const one = text === null ? null : homeIn(relPath, text)
    if (one !== null) said.push(one)
  }
  const homes = new Map<string, RowsHome[]>()
  for (const one of said) {
    const standing = homes.get(one.target)
    if (standing === undefined) homes.set(one.target, [one])
    else standing.push(one)
  }
  return homes
}

type HomesData = readonly (readonly [string, readonly RowsHome[]])[]

const asHomesData = (one: ReadonlyMap<string, readonly RowsHome[]>): HomesData => [...one]

const fromHomesData = (one: HomesData): ReadonlyMap<string, readonly RowsHome[]> => new Map(one)

function heldHomes(tree: FileTree): ReadonlyMap<string, readonly RowsHome[]> {
  const mark = shapeMarkOf(tree)
  const root = tree.root
  const make = (): ReadonlyMap<string, readonly RowsHome[]> => homesIn(tree)
  if (mark === null || root === undefined) return make()
  return answeredWhole(root, mark, "rows-homes", make, asHomesData, fromHomesData)
}

const homes = new WeakMap<FileTree, ReadonlyMap<string, readonly RowsHome[]>>()

function homesOf(tree: FileTree): ReadonlyMap<string, readonly RowsHome[]> {
  const standing = homes.get(tree)
  if (standing !== undefined) return standing
  const made = heldHomes(tree)
  homes.set(tree, made)
  return made
}

export function rowsHomesFor(tree: FileTree, pageType: string): readonly RowsHome[] {
  return homesOf(tree).get(pageType) ?? []
}
