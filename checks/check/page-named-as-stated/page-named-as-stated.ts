import { relative } from "node:path"
import { rootsHere } from "../../../graph/roots.ts"
import { pageNameOf } from "../../../page/page-name.ts"
import { nameOf, namingOf, type PageTypeNaming, ruleFor } from "../../../page/page-naming.ts"
import { pagesIn, specFor } from "../../../page/pages.ts"
import { blockOf, textAt } from "../../../page/text.ts"
import type { Check, CheckFailure, Tree } from "../check-shape.ts"

const PAGE_TYPE = "page-type"

function namingIn(tree: Tree): ReadonlyMap<string, PageTypeNaming> {
  const found = new Map<string, PageTypeNaming>()
  for (const root of Object.values(rootsHere())) {
    if (root === undefined) continue
    for (const page of pagesIn(root, specFor(PAGE_TYPE))) {
      const text = textAt(root, page.key)
      if (text === null) continue
      const held = namingOf(text)
      if (held !== null) found.set(page.stem, held)
    }
  }
  for (const path of tree.paths()) {
    const named = pageNameOf(path)
    if (named === null || named.type !== PAGE_TYPE) continue
    const body = tree.at(path)
    if (body === null) continue
    const held = namingOf(body.toString("utf8"))
    if (held !== null) found.set(named.stem, held)
  }
  return found
}

export const pageNamedAsStated: Check = {
  slug: "page-named-as-stated",
  needs: "tree",
  run: ({ paths, tree }) => {
    const pages = paths.filter((one) => pageNameOf(relative(tree.root, one)) !== null)
    if (pages.length === 0) return []
    const naming = namingIn(tree)
    const failures: CheckFailure[] = []
    for (const path of pages) {
      const named = pageNameOf(relative(tree.root, path))
      if (named === null) continue
      const body = tree.at(path)
      if (body === null) continue
      const { fm, why } = blockOf(body.toString("utf8"))
      if (why !== null) continue
      const rule = ruleFor(naming, named.type)
      const held = nameOf(rule, fm)
      if (held === null) {
        failures.push({
          path,
          reason: "carries no rule, slug, title or id, so nothing gives it a name",
        })
        continue
      }
      if (held.name === named.stem) continue
      failures.push({
        path,
        reason:
          `is named \`${held.name}\` by its \`${held.via}\`` +
          `${held.via === "named-for" ? ` rule \`${rule ?? ""}\`` : ""}` +
          `, and the file is named \`${named.stem}\``,
      })
    }
    return failures
  },
}

export default pageNamedAsStated
