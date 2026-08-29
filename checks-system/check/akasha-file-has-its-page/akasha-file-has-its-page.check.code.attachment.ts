import { existsSync } from "node:fs"
import { relative, resolve } from "node:path"
import type { Corpus } from "../../../akasha/write-system/corpus.module.code.ts"
import { corpusIn } from "../../../akasha/write-system/corpus.module.code.ts"
import type { Check, CheckFailure } from "../check-shape.ts"
import { claimsIn } from "../page-claims.ts"

const AKASHA = "akasha"

const UNREAD =
  "the akasha folder stands and its corpus will not load, so nothing here was judged and this " +
  "is no answer about the tree —"

const REASON =
  "no page claims this file — a file under `akasha` is a page, named for its slug and its page " +
  "type, or one page property's own file, named for its page and for the property it holds"

function loaded(from: string): Corpus | string {
  try {
    return corpusIn(from)
  } catch (thrown) {
    return thrown instanceof Error ? thrown.message : String(thrown)
  }
}

export const akashaFileHasItsPage = {
  slug: "akasha-file-has-its-page",
  needs: "tree",
  run: ({ root, tree }) => {
    const under = resolve(root, AKASHA)
    const from = resolve(tree.dir(), AKASHA)
    if (!existsSync(from)) return []
    const corpus = loaded(from)
    if (typeof corpus === "string") {
      return [{ path: under, reason: `${UNREAD} ${corpus}` }]
    }
    const claimed = new Set<string>()
    for (const page of corpus.every()) claimed.add(resolve(under, relative(from, page.path)))
    for (const claim of claimsIn(corpus)) claimed.add(resolve(under, relative(from, claim.path)))
    const failures: CheckFailure[] = []
    for (const path of tree.paths()) {
      if (!path.startsWith(`${under}/`)) continue
      if (claimed.has(path)) continue
      failures.push({ path, reason: REASON })
    }
    return failures
  },
} satisfies Check

export default akashaFileHasItsPage
