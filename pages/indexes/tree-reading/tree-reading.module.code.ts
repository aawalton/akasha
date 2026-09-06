import { readdirSync } from "node:fs"
import { join } from "node:path"
import { QUARANTINE_ROOT, VENDOR_ROOT } from "@akasha/pages/checkout-roots"
import { partedIn } from "@akasha/pages/page-file-name"

const PAGE_TYPE = "page-type"

const UNWALKED = new Set<string>([VENDOR_ROOT, ".git", ".supervisors"])

// The quarantine is one folder at the top of a checkout, which is how `isDirty` reads it. Matching
// that name at every depth instead takes any folder called `dirty` out of the index, page and all.
export function walkedUnder(at: string, taking: (name: string) => boolean): readonly string[] {
  const found: string[] = []
  const walk = (here: string): undefined => {
    for (const one of readdirSync(here, { withFileTypes: true })) {
      const next = join(here, one.name)
      if (one.isDirectory()) {
        if (UNWALKED.has(one.name)) continue
        if (here === at && one.name === QUARANTINE_ROOT) continue
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
