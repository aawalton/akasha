import { basename, dirname, join, relative } from "node:path"
import { textIn } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import { testFixture } from "akasha/check/test/fixture/test-fixture.page-type.ts"
import { componentTestFixtures } from "akasha/code/component/properties/component-test-fixtures.code-file-property.ts"
import { code } from "akasha/code/module/properties/code.code-file-property.ts"
import { testFixtures } from "akasha/code/module/properties/test-fixtures.code-file-property.ts"
import { testsBesideOf } from "akasha/code/running/modules/code-tests/code-tests.module.code.ts"
import type { Link } from "akasha/code/running/modules/test-overlay/test-overlay.module.code.ts"
import { calledIn } from "akasha/code/workspace/modules/package-manifest/package-manifest.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"

export function testedBeside(path: string, shadow: Shadow): boolean {
  for (const beside of testsBesideOf(path)) {
    if (beside === path) return true
    if (shadow.holds(beside)) return true
  }
  return false
}

const FIXTURES_HELD: ReadonlySet<string> = new Set<string>([
  ...testFixtures.extensions,
  ...componentTestFixtures.extensions,
])

const CODE_HELD: ReadonlySet<string> = new Set<string>(code.extensions)

function fixtureNamed(path: string): boolean {
  const said = partedIn(path)
  if (said === null) return false
  if (said.pageType === testFixture.slug) {
    const [only, ...rest] = said.sections
    return only === code.propertySlug && rest.length === 0 && CODE_HELD.has(said.held)
  }
  return said.sections.at(-1) === testFixtures.propertySlug && FIXTURES_HELD.has(said.held)
}

export function namedOver(
  paths: readonly string[],
  there: (path: string) => boolean,
  importersOf: (path: string) => readonly string[]
): readonly string[] {
  const held = new Set<string>()
  const holding = (one: string): undefined => {
    for (const beside of testsBesideOf(one)) {
      if (there(beside)) held.add(beside)
    }
  }
  for (const one of paths) {
    holding(one)
    if (!fixtureNamed(one)) continue
    for (const importer of importersOf(one)) holding(importer)
  }
  return [...held].sort()
}

export function namedIn(change: Change, shadow: Shadow): readonly string[] {
  return namedOver(
    change.changed,
    (path) => change.after(path) !== null,
    (path) => shadow.index.importersOf(path)
  )
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
