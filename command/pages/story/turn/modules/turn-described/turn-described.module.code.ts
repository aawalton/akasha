import { dirname } from "node:path"
import { told } from "akasha/git/modules/running/git-running.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { valueAt, valueIn } from "akasha/page/modules/value/page-value.module.code.ts"
import {
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { kindsUnder } from "akasha/page/type/modules/descent/page-type-descent.module.code.ts"

const MECHANIC = "world-mechanic"

const DESCRIPTION = "description"

const STORIES = "/stories/"

const PAGE_HELD = "ts"

const HEAD = "HEAD"

const RENAMED = "R"

export type Describing = (path: string) => {
  readonly before: string | null
  readonly after: string | null
}

export function describedIn(
  paths: readonly string[],
  kinds: ReadonlySet<string>,
  describing: Describing
): readonly string[] {
  const found: string[] = []
  for (const path of paths) {
    const parted = partedIn(path)
    if (parted === null || parted.held !== PAGE_HELD || parted.sections.length > 0) continue
    if (!kinds.has(parted.pageType)) continue
    const { before, after } = describing(path)
    if (after !== null && after !== before) found.push(path)
  }
  return found.sort()
}

function descriptionOf(value: Value | null): string | null {
  return value === null ? null : textAt(value, DESCRIPTION)
}

export type Logging = (argv: readonly string[]) => string | null

function movedFrom(shown: string, to: string): string | null {
  for (const line of shown.split("\n")) {
    const [status, from, into] = line.split("\t")
    if (status?.startsWith(RENAMED) === true && into === to && from !== undefined) return from
  }
  return null
}

export function openedIn(at: string, log: Logging): string | null {
  let path = at
  let since = HEAD
  for (;;) {
    const said = log(["log", "--diff-filter=A", "-n", "1", "--format=%H", since, "--", path])
    const commit = said === null ? "" : said.trim()
    if (commit === "") return null
    const shown = log(["show", "-M", "--diff-filter=R", "--name-status", "--format=", commit])
    const from = movedFrom(shown ?? "", path)
    if (from === null) return commit
    path = from
    since = `${commit}^`
  }
}

function openedAt(root: string, at: string): string | null {
  return openedIn(at, (argv) => told(root, argv))
}

export function storyFolderOf(turnAt: string): string | null {
  return turnAt.includes(STORIES) ? dirname(dirname(turnAt)) : null
}

export function describedIndexed(root: string, turn: { readonly at: string }): readonly string[] {
  const story = storyFolderOf(turn.at)
  if (story === null) return []
  const base = openedAt(root, turn.at)
  if (base === null) return []
  const changed = told(root, ["diff", "--name-only", base, "HEAD", "--", story])
  if (changed === null) return []
  const paths = changed.split("\n").filter((one) => one !== "")
  return describedIn(paths, kindsUnder(MECHANIC, root), (path) => {
    const was = told(root, ["show", `${base}:${path}`])
    return {
      before: descriptionOf(was === null ? null : valueIn(was)),
      after: descriptionOf(valueAt(path, root)),
    }
  })
}
