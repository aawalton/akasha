import { basename, dirname, join, relative } from "node:path"
import { textIn } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import { testsBesideOf } from "akasha/code/running/modules/code-tests/code-tests.module.code.ts"
import type { Link } from "akasha/code/running/modules/test-overlay/test-overlay.module.code.ts"
import { calledIn } from "akasha/code/workspace/modules/package-manifest/package-manifest.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"

export function testedBeside(path: string, shadow: Shadow): boolean {
  for (const beside of testsBesideOf(path)) {
    if (beside === path) return true
    if (shadow.holds(beside)) return true
  }
  return false
}

export function namedIn(change: Change): readonly string[] {
  const held = new Set<string>()
  for (const one of change.changed) {
    for (const beside of testsBesideOf(one)) {
      if (change.after(beside) === null) continue
      held.add(beside)
    }
  }
  return [...held].sort()
}

const MODULES = "node_modules"

const MANIFEST = "package.json"

const ROOT = "."

export function linksIn(change: Change): ReadonlyMap<string, Link> {
  const found = new Map<string, Link>()
  for (const one of change.changed) {
    const folder = dirname(one)
    if (basename(one) !== MANIFEST || folder === ROOT) continue
    const named = calledIn(textIn(change, one))
    if (named === null) continue
    const at = join(MODULES, named)
    found.set(at, { linkedTo: relative(dirname(at), folder) })
  }
  return found
}
