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

export function namedOver(
  paths: readonly string[],
  there: (path: string) => boolean
): readonly string[] {
  const held = new Set<string>()
  for (const one of paths) {
    for (const beside of testsBesideOf(one)) {
      if (!there(beside)) continue
      held.add(beside)
    }
  }
  return [...held].sort()
}

export function namedIn(change: Change): readonly string[] {
  return namedOver(change.changed, (path) => change.after(path) !== null)
}

const MODULES = "node_modules"

const MANIFEST = "package.json"

const ROOT = "."

export function linksOver(
  paths: readonly string[],
  read: (path: string) => string | null
): ReadonlyMap<string, Link> {
  const found = new Map<string, Link>()
  for (const one of paths) {
    const folder = dirname(one)
    if (basename(one) !== MANIFEST || folder === ROOT) continue
    const named = calledIn(read(one))
    if (named === null) continue
    const at = join(MODULES, named)
    found.set(at, { linkedTo: relative(dirname(at), folder) })
  }
  return found
}

export function linksIn(change: Change): ReadonlyMap<string, Link> {
  return linksOver(change.changed, (path) => textIn(change, path))
}
