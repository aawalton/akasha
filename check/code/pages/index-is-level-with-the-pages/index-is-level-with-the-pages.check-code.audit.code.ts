import {
  type Drifted,
  fileIn,
  judgedIn,
} from "akasha/check/code/pages/index-is-level-with-the-pages/index-is-level-with-the-pages.check-code.decision.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { said } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { refreshedWhole } from "akasha/page/index/modules/indexing/indexing.module.code.ts"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

const PARTED_BY = "\n"

const STATUS_WIDTH = 3

const RENAMED = " -> "

const NOWHERE = -1

const PAGE_TYPE = "page-type"

const MORTAL = "mortal"

const SLUG = "slug"

const BESIDE = "."

const HELD = "ts"

type Reconciling = (root: string) => Drifted

type Committing = (root: string) => string

type Moving = (root: string, from: string, to: string) => readonly string[]

type Writing = (root: string) => readonly string[]

type Dies = (path: string) => boolean

type Reading = {
  readonly read?: Reconciling
  readonly at?: Committing
  readonly moved?: Moving
  readonly written?: Writing
  readonly dies?: Dies
}

const reconciling: Reconciling = (root) => refreshedWhole(root, root, false).drift

const committing: Committing = (root) => said(["git", "-C", root, "rev-parse", "HEAD"]).trim()

const moving: Moving = (root, from, to) =>
  said(["git", "-C", root, "diff", "--name-only", from, to])
    .split(PARTED_BY)
    .filter((one) => one !== "")

export function pathOf(line: string): string {
  const held = line.slice(STATUS_WIDTH)
  const cut = held.indexOf(RENAMED)
  return cut === NOWHERE ? held : held.slice(cut + RENAMED.length)
}

const writing: Writing = (root) =>
  said(["git", "-C", root, "status", "--porcelain", "--untracked-files=all"])
    .split(PARTED_BY)
    .filter((one) => one !== "")
    .map((one) => pathOf(one))

export function typeNaming(path: string): string {
  const parted = partedIn(path)
  if (parted !== null) return parted.pageType
  const cut = path.lastIndexOf(BESIDE)
  if (cut === NOWHERE) return ""
  return partedIn(`${path.slice(0, cut)}${BESIDE}${HELD}`)?.pageType ?? ""
}

function dyingUnder(root: string): Dies {
  const gone = new Set<string>()
  for (const one of valuesOfType(root, PAGE_TYPE)) {
    const held = one.value as Record<string, unknown>
    const slug = held[SLUG]
    if (held[MORTAL] !== true || typeof slug !== "string") continue
    gone.add(slug)
  }
  return (path) => gone.has(typeNaming(path))
}

export function livingIn(drift: Drifted, dies: Dies): Drifted {
  const kept = (every: readonly string[]): readonly string[] =>
    every.filter((one) => !dies(fileIn(one)))
  return { added: kept(drift.added), changed: kept(drift.changed), went: kept(drift.went) }
}

export function indexIsLevelWithThePages(root: string, given: Reading = {}): readonly Judged[] {
  const read = given.read ?? reconciling
  const at = given.at ?? committing
  const moved = given.moved ?? moving
  const written = given.written ?? writing
  const dies = given.dies ?? dyingUnder(root)
  const before = at(root)
  const opened = written(root)
  const drift = read(root)
  const after = at(root)
  const landed = before === after ? [] : moved(root, before, after)
  return judgedIn(livingIn(drift, dies), [...opened, ...landed, ...written(root)])
}
