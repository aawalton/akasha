import { dirname } from "node:path"
import {
  judgingBy,
  type Kinds,
  kindsFor,
  namedAt,
  type Seen,
} from "akasha/check/code/pages/command-is-named-by-its-place-in-the-tree/command-is-named-by-its-place-in-the-tree.check-code.decision.code.ts"
import {
  type Commit,
  commitIn,
  type Paged,
} from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { textAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const ID = "id"

function pagesOfKinds(paged: Paged, kinds: Kinds): readonly string[] {
  const found = new Set<string>()
  for (const slug of [...kinds.tree, ...kinds.modules]) {
    for (const one of paged.index.everyOfType(slug)) found.add(one.path)
  }
  return [...found].sort()
}

function seenIn(commit: Commit): Seen {
  const held = new Map<string, string[]>()
  for (const one of commit.paths) {
    const folder = dirname(one)
    const found = held.get(folder)
    if (found === undefined) held.set(folder, [one])
    else found.push(one)
  }
  return {
    index: commit.index,
    pageOf: commit.pageOf,
    listed: (folder) => (folder === undefined ? commit.paths : (held.get(folder) ?? [])),
  }
}

export function commandIsNamedByItsPlaceInTheTree(root: string): readonly Judged[] {
  const commit = commitIn(root)
  const kinds = kindsFor(commit)
  const judging = judgingBy(seenIn(commit), kinds)
  const said: Judged[] = []
  for (const path of pagesOfKinds(commit, kinds)) {
    const one = namedAt(path, kinds)
    if (one === null) continue
    const value = commit.pageOf(path)
    const id = value === null ? null : textAt(value, ID)
    if (id === null) continue
    const reason = judging(id, path, one)
    if (reason !== null) said.push({ path, reason })
  }
  return said
}
