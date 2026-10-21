import { basename, dirname, join, relative } from "node:path"
import { textIn } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import { testFixture } from "akasha/check/test/fixture/test-fixture.page-type.ts"
import { testNamed } from "akasha/code/body/modules/file-kind/file-kind.module.code.ts"
import { componentTestFixtures } from "akasha/code/component/properties/component-test-fixtures.code-file-property.ts"
import { code } from "akasha/code/module/properties/code.code-file-property.ts"
import { testFixtures } from "akasha/code/module/properties/test-fixtures.code-file-property.ts"
import { testReads } from "akasha/code/module/properties/test-reads.multi-relation-property.ts"
import { testsBesideOf } from "akasha/code/running/modules/code-tests/code-tests.module.code.ts"
import type { Link } from "akasha/code/running/modules/test-overlay/test-overlay.module.code.ts"
import { calledIn } from "akasha/code/workspace/modules/package-manifest/package-manifest.module.code.ts"
import type { Answering } from "akasha/page/index/modules/answering/index-answering.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

type ReadersOf = (path: string) => readonly string[]

type Naming = Pick<Answering, "listedAt" | "namersAt" | "fileKeysAt" | "typesCarrying">

type Reaching = Pick<Answering, "importsReaching">

const REACHERS = new WeakMap<Reaching, ReadersOf>()

export function reachersIn(index: Reaching): ReadersOf {
  const held = REACHERS.get(index)
  if (held !== undefined) return held
  const reachersOf: ReadersOf = (path) => {
    const seen = new Set<string>([path])
    const waiting = [path]
    const found: string[] = []
    for (let at = 0; at < waiting.length; at += 1) {
      const one = waiting[at]
      if (one === undefined) continue
      if (one !== path && testNamed(one)) found.push(one)
      for (const importer of index.importsReaching(one)) {
        if (importer.typed || seen.has(importer.path)) continue
        seen.add(importer.path)
        waiting.push(importer.path)
      }
    }
    return found.sort()
  }
  REACHERS.set(index, reachersOf)
  return reachersOf
}

function noReaders(): readonly string[] {
  return []
}

const READERS = new WeakMap<Naming, ReadersOf>()

const UNDER = "/"

function typesOf(index: Naming, path: string): readonly string[] {
  const said = partedIn(path)
  if (said !== null) return [said.pageType]
  const found: string[] = []
  for (const [slug, fileName] of index.fileKeysAt()) {
    if (fileName === null) continue
    if (path !== fileName && !path.endsWith(`${UNDER}${fileName}`)) continue
    found.push(...index.typesCarrying(slug))
  }
  return found
}

export function readersIn(index: Naming): ReadersOf {
  const held = READERS.get(index)
  if (held !== undefined) return held
  const byType = new Map<string, readonly string[]>()
  const readersOfType = (slug: string): readonly string[] => {
    const known = byType.get(slug)
    if (known !== undefined) return known
    const listed = index.listedAt(pageType.slug, slug)[0]
    const found =
      listed === undefined
        ? []
        : index
            .namersAt(listed.path)
            .filter((one) => one.propertySlug === testReads.propertySlug)
            .map((one) => one.path)
    byType.set(slug, found)
    return found
  }
  const readersOf: ReadersOf = (path) => {
    const found = new Set<string>()
    for (const slug of typesOf(index, path)) {
      for (const one of readersOfType(slug)) found.add(one)
    }
    return [...found]
  }
  READERS.set(index, readersOf)
  return readersOf
}

export function testedBeside(path: string, shadow: Shadow): boolean {
  for (const beside of testsBesideOf(path)) {
    if (beside === path) return true
    if (shadow.holds(beside)) return true
  }
  for (const reader of readersIn(shadow.index)(path)) {
    for (const beside of testsBesideOf(reader)) {
      if (shadow.holds(beside)) return true
    }
  }
  return reachersIn(shadow.index)(path).some((one) => shadow.holds(one))
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
  importersOf: (path: string) => readonly string[],
  readersOf: ReadersOf = noReaders,
  reachersOf: ReadersOf = noReaders
): readonly string[] {
  const held = new Set<string>()
  const holding = (one: string): undefined => {
    for (const beside of testsBesideOf(one)) {
      if (there(beside)) held.add(beside)
    }
  }
  for (const one of paths) {
    holding(one)
    for (const reader of readersOf(one)) holding(reader)
    for (const reacher of reachersOf(one)) {
      if (there(reacher)) held.add(reacher)
    }
    const fixture = fixtureNamed(one)
    for (const importer of importersOf(one)) {
      if (fixture) holding(importer)
      else if (testsBesideOf(importer).includes(importer) && there(importer)) held.add(importer)
    }
  }
  return [...held].sort()
}

export function namedIn(change: Change, shadow: Shadow): readonly string[] {
  return namedOver(
    change.changed,
    (path) => change.after(path) !== null,
    (path) => shadow.index.importersOf(path),
    readersIn(shadow.index),
    reachersIn(shadow.index)
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
