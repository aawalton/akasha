import {
  type Drifted,
  judgedIn,
} from "akasha/checks/code-checks/pages/index-is-level-with-the-pages/index-is-level-with-the-pages.code-check.decision.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { refreshedWhole } from "akasha/pages/indexes/indexing/indexing.module.code.ts"
import { said } from "akasha/utils/run/running/running.module.code.ts"

const PARTED_BY = "\n"

const STATUS_WIDTH = 3

const RENAMED = " -> "

const NOWHERE = -1

export type Reconciling = (root: string) => Drifted

export type Committing = (root: string) => string

export type Moving = (root: string, from: string, to: string) => readonly string[]

export type Writing = (root: string) => readonly string[]

export type Reading = {
  readonly read?: Reconciling
  readonly at?: Committing
  readonly moved?: Moving
  readonly written?: Writing
}

export const reconciling: Reconciling = (root) => refreshedWhole(root, root, false).drift

export const committing: Committing = (root) =>
  said(["git", "-C", root, "rev-parse", "HEAD"]).trim()

export const moving: Moving = (root, from, to) =>
  said(["git", "-C", root, "diff", "--name-only", from, to])
    .split(PARTED_BY)
    .filter((one) => one !== "")

export function pathOf(line: string): string {
  const held = line.slice(STATUS_WIDTH)
  const cut = held.indexOf(RENAMED)
  return cut === NOWHERE ? held : held.slice(cut + RENAMED.length)
}

export const writing: Writing = (root) =>
  said(["git", "-C", root, "status", "--porcelain", "--untracked-files=all"])
    .split(PARTED_BY)
    .filter((one) => one !== "")
    .map((one) => pathOf(one))

export function indexIsLevelWithThePages(root: string, given: Reading = {}): readonly Judged[] {
  const read = given.read ?? reconciling
  const at = given.at ?? committing
  const moved = given.moved ?? moving
  const written = given.written ?? writing
  const before = at(root)
  const opened = written(root)
  const drift = read(root)
  const after = at(root)
  const landed = before === after ? [] : moved(root, before, after)
  return judgedIn(drift, [...opened, ...landed, ...written(root)])
}
