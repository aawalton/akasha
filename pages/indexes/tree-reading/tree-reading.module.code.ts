import { readdirSync } from "node:fs"
import { join } from "node:path"
import { partedIn } from "akasha/pages/file-name/page-file-name.module.code.ts"
import {
  QUARANTINE_ROOT,
  VENDOR_ROOT,
} from "akasha/pages/modules/checkout-roots/checkout-roots.module.code.ts"

const PAGE_TYPE = "page-type"

const UNWALKED = new Set<string>([VENDOR_ROOT, ".git"])

const LOCK = ".lock"

export function walkedUnder(
  at: string,
  taking: (name: string) => boolean,
  entering: (path: string) => boolean = () => true
): readonly string[] {
  const found: string[] = []
  const walk = (here: string): undefined => {
    for (const one of readdirSync(here, { withFileTypes: true })) {
      const next = join(here, one.name)
      if (one.isDirectory()) {
        if (UNWALKED.has(one.name) || one.name.endsWith(LOCK)) continue
        if (here === at && one.name === QUARANTINE_ROOT) continue
        if (!entering(next)) continue
        walk(next)
      } else if (taking(one.name)) found.push(next)
    }
  }
  walk(at)
  return found
}

export function pagesUnder(tree: string): readonly string[] {
  const found = walkedUnder(tree, (name) => partedIn(name)?.sections.length === 0)
  const pageTypes = new Set<string>([PAGE_TYPE])
  for (const one of found) {
    const said = partedIn(one)
    if (said?.pageType === PAGE_TYPE) pageTypes.add(said.slug)
  }
  return found.filter((one) => pageTypes.has(partedIn(one)?.pageType ?? ""))
}
