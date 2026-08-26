import { relative } from "node:path"
import type { Check } from "../check-shape.ts"
import { indexOf, nameOf, pagesOver } from "../../../graph/page-index/page-index.ts"
import { type PageAt, saidAt } from "../../../page/page-at.ts"
import { AKASHA, INSTRUCTIONS, rootsHere } from "../../../repo/roots/roots.ts"
import { pageNameOf } from "../../../page/page-name.ts"
import { trackedIn } from "../../../page/pages.ts"

function elsewhere(found: readonly PageAt[], at: PageAt): readonly PageAt[] {
  return found.filter((one) => one.repo !== at.repo || one.key !== at.key)
}

export const pageNameUnique: Check = {
  slug: "page-name-unique",
  needs: "tree",
  run: ({ paths, tree }) => {
    const here = paths
      .map((one) => relative(tree.root, one))
      .filter((one) => pageNameOf(one) !== null)
    if (here.length === 0) return []
    const lending = rootsHere()[INSTRUCTIONS]
    const every = [
      ...pagesOver(
        AKASHA,
        tree.paths().map((one) => relative(tree.root, one))
      ),
      ...(lending === undefined ? [] : pagesOver(INSTRUCTIONS, trackedIn(lending))),
    ]
    const byName = indexOf(every).byName
    const failures = []
    for (const key of here) {
      const named = pageNameOf(key)
      if (named === null) continue
      const name = nameOf(named.type, named.stem)
      const found = byName.get(name) ?? []
      const others = elsewhere(found, { repo: AKASHA, key, ...named })
      if (others.length === 0) continue
      failures.push({
        path: `${tree.root}/${key}`,
        reason:
          `is named \`${name}\`, and so is ${others.map(saidAt).join(" and ")}` +
          ` — so nothing says which one a reference to it reaches`,
      })
    }
    return failures
  },
}

export default pageNameUnique
