import { join } from "node:path"
import { akasha } from "akasha/akasha.domain.ts"
import { testNamed } from "akasha/code/body/modules/file-kind/file-kind.module.code.ts"
import { sharedBuildFiles } from "akasha/code/ios-app/modules/shared-build-files/shared-build-files.module.code.ts"
import { folderOf } from "akasha/code/path/modules/between/code-path-between.module.code.ts"
import { reachOf } from "akasha/code/stylesheet/modules/source-globbing/source-globbing.change-generator.code.ts"
import {
  CLUSTER_SERVICE,
  IOS_APP,
  type Named,
  TEMPER_ADDON,
  WEB_APP,
  WORKSTATION_SERVICE,
} from "akasha/command/pages/deploy/modules/kind-reading/deploy-kind-reading.module.code.ts"
import { bodyAt as bodyInCommit } from "akasha/git/modules/commit-reading/commit-reading.module.code.ts"
import { said } from "akasha/git/modules/running/git-running.module.code.ts"
import { closureOf } from "akasha/graph/predicate/modules/closure/graph-predicate-closure.module.code.ts"
import { imports } from "akasha/graph/predicate/pages/imports/imports.graph-predicate.ts"
import {
  type ImageNamed,
  namedByPage,
} from "akasha/infrastructure/container-image/modules/image-build/image-build.module.code.ts"
import { copiedIn } from "akasha/infrastructure/container-image/modules/image-inputs/image-inputs.module.code.ts"
import { deployableNamed } from "akasha/infrastructure/service/akasha-service/service-cluster/modules/web-app-reading/web-app-reading.module.code.ts"
import { servableNamed } from "akasha/infrastructure/service/akasha-service/service-cluster/modules/workload-applying/workload-applying.module.code.ts"
import { runnerCodeIn } from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-reading/service-reading.module.code.ts"
import {
  type Answering,
  answeringOver,
} from "akasha/page/index/modules/answering/index-answering.module.code.ts"
import { pagesAt } from "akasha/page/index/modules/commit-surface/commit-surface.module.code.ts"
import type { Body } from "akasha/page/index/modules/package-reaching/package-reaching.module.code.ts"
import {
  type Facing,
  facingIn,
  facingOn,
  generatedIn,
} from "akasha/page/index/modules/property-carrying/property-carrying.module.code.ts"
import {
  everyOfType,
  valueByPath,
  valuesOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Reading as Pages } from "akasha/page/index/modules/shape/index-shape.module.code.ts"

import { textAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const APART = "\0"

function trackedAt(root: string, commit: string): readonly string[] {
  const held = said(root, ["ls-tree", "-r", "-z", "--name-only", commit]).split(APART)
  return held.filter((one) => one !== "")
}

function bodiesFrom(root: string, commit: string): Body {
  const reading = new TextDecoder()
  return (path) => {
    const held = bodyInCommit(root, commit, path)
    return held === null ? null : reading.decode(held)
  }
}

function memoized(bodyAt: Body): Body {
  const held = new Map<string, string | null>()
  return (path) => {
    const found = held.get(path)
    if (found !== undefined || held.has(path)) return found ?? null
    const body = bodyAt(path)
    held.set(path, body)
    return body
  }
}

type Onward = (path: string) => boolean

export type Reading = {
  readonly tracked: readonly string[]
  readonly bodyAt: Body
  readonly over: (seeds: readonly string[], onward?: Onward) => ReadonlySet<string>
}

function everyOnward(): boolean {
  return true
}

export function readingOver(tracked: readonly string[], bodyAt: Body, index: Answering): Reading {
  const bodies = memoized(bodyAt)
  const every = new Set(tracked)
  return {
    tracked,
    bodyAt: bodies,
    over: (seeds, onward = everyOnward) => {
      const held = seeds.filter(onward)
      const seeded = new Set(held)
      const through = (one: string): boolean => onward(one) && (seeded.has(one) || every.has(one))
      return new Set(closureOf(imports, held, { index, bodyAt: bodies, through }))
    },
  }
}

export function indexOver(pages: Pages): Answering {
  return answeringOver(pages, (path) => valueByPath(pages, path))
}

export function readingAt(
  root: string,
  commit: string,
  pages: Pages = pagesAt(root, commit)
): Reading {
  return readingOver(trackedAt(root, commit), bodiesFrom(root, commit), indexOver(pages))
}

export function underFolder(tracked: readonly string[], folder: string): readonly string[] {
  const lead = folder === "" ? "" : `${folder}/`
  return tracked.filter((one) => one.startsWith(lead))
}

export function besideThe(tracked: readonly string[], pagePath: string): readonly string[] {
  return underFolder(tracked, folderOf(pagePath))
}

export function testWrittenForAPage(path: string): boolean {
  return testNamed(path)
}

export function carriedOver(
  tracked: readonly string[],
  built: ReadonlySet<string>,
  changed: readonly string[]
): readonly string[] {
  const folders = new Set<string>()
  for (const one of built) folders.add(folderOf(one))
  const judging = new Set<string>()
  for (const one of changed) judging.add(folderOf(one))
  const found = new Set<string>(built)
  for (const one of tracked) {
    const folder = folderOf(one)
    if (!folders.has(folder)) continue
    if (testWrittenForAPage(one) && !judging.has(folder)) continue
    found.add(one)
  }
  return [...found]
}

export function carriedWith(
  root: string,
  commit: string,
  built: ReadonlySet<string>,
  changed: readonly string[] = []
): readonly string[] {
  return carriedOver(trackedAt(root, commit), built, changed)
}

export function webSeeds(
  pages: string | Pages,
  slug: string,
  tracked: readonly string[]
): readonly string[] {
  const read = deployableNamed(pages, slug)
  if ("refused" in read) return []
  const app = read.deployable
  const applied = [app.manifestPath, app.synthPath, app.manifestsPath].filter(
    (one): one is string => one !== null
  )
  return [app.servicePath, ...applied, ...underFolder(tracked, app.sourceDirectory)]
}

export function clusterSeeds(pages: string | Pages, slug: string): readonly string[] {
  const read = servableNamed(pages, slug)
  if ("refused" in read) return []
  return [read.servable.manifestPath, read.servable.synthPath]
}

function iosSeeds(pages: string | Pages): readonly string[] {
  const shared = sharedBuildFiles(pages)
  return "why" in shared ? [] : shared.files
}

function everySeed(
  pages: string | Pages,
  kind: string,
  tracked: readonly string[]
): readonly string[] {
  const found: string[] = []
  for (const one of everyOfType(pages, kind)) found.push(...besideThe(tracked, one.path))
  return found
}

export function kindSeeds(pages: string | Pages, kind: string): readonly string[] {
  return kind === WORKSTATION_SERVICE ? runnerCodeIn(pages) : []
}

function seedsFor(
  root: string,
  slug: string,
  read: Named,
  tracked: readonly string[],
  pages: string | Pages = root
): readonly string[] {
  const shared = kindSeeds(pages, read.kind)
  if (read.every === true) return [...everySeed(pages, read.kind, tracked), ...shared]
  const beside = [...besideThe(tracked, read.pagePath), ...shared]
  if (read.kind === WEB_APP) return [...beside, ...webSeeds(pages, slug, tracked)]
  if (read.kind === IOS_APP) return [...beside, ...iosSeeds(pages)]
  if (read.kind === CLUSTER_SERVICE) return [...beside, ...clusterSeeds(pages, slug)]
  return beside
}

const TYPES_HELD = ".types.ts"

export function typesWrittenForAPage(path: string): boolean {
  return path.endsWith(TYPES_HELD)
}

function facingOver(root: string, pages: string | Pages): Facing {
  if (typeof pages === "string") return facingOn(pages)
  return { ...facingIn(root, pages), holds: (at) => pages.read(at) !== null }
}

function pastWhatIsGenerated(root: string, pages: string | Pages): Onward {
  const facing = facingOver(root, pages)
  return (one) => !typesWrittenForAPage(one) && !generatedIn(facing, one)
}

export function onwardOf(
  kind: Named["kind"],
  root: string,
  pages: string | Pages = root
): Onward | undefined {
  return kind === TEMPER_ADDON ? pastWhatIsGenerated(root, pages) : undefined
}

const TRAILING = /\/+$/

const THE_CONTEXT = "."

function copiedPath(context: string, source: string): string {
  const joined = join(context, source).replace(TRAILING, "")
  return joined === THE_CONTEXT ? "" : joined
}

function copiedOutOf(
  reading: Reading,
  every: ReadonlySet<string>,
  named: ImageNamed
): readonly string[] {
  const body = reading.bodyAt(named.recipe)
  if (body === null) return []
  const found = [named.recipe]
  for (const one of copiedIn(body)) {
    const at = copiedPath(named.context, one)
    found.push(...(every.has(at) ? [at] : underFolder(reading.tracked, at)))
  }
  return found
}

export function closureWithImages(
  reading: Reading,
  seeds: readonly string[],
  images: ReadonlyMap<string, ImageNamed>,
  onward?: Onward
): ReadonlySet<string> {
  const seeded = new Set(seeds)
  const copying = new Set<string>()
  const every = new Set(reading.tracked)
  for (;;) {
    const built = reading.over([...seeded], onward)
    const reached = [...images].filter(([page]) => built.has(page) && !copying.has(page))
    if (reached.length === 0) return built
    for (const [page, named] of reached) {
      copying.add(page)
      for (const one of copiedOutOf(reading, every, named)) seeded.add(one)
    }
  }
}

export function closureIn(
  reading: Reading,
  root: string,
  slug: string,
  read: Named,
  pages: string | Pages = root
): ReadonlySet<string> {
  const seeds = seedsFor(root, slug, read, reading.tracked, pages)
  return closureWithImages(reading, seeds, namedByPage(pages), onwardOf(read.kind, root, pages))
}

export function closuresOf(
  root: string,
  kind: Named["kind"],
  commit: string
): ReadonlyMap<string, ReadonlySet<string>> {
  const pages = pagesAt(root, commit)
  const reading = readingAt(root, commit, pages)
  const found = new Map<string, ReadonlySet<string>>()
  for (const [slug, pagePath] of kindPagesIn(pages, kind)) {
    found.set(slug, closureIn(reading, root, slug, { kind, pagePath }, pages))
  }
  return found
}

export function kindPagesIn(pages: string | Pages, kind: string): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  for (const one of valuesOfType(pages, kind)) {
    const slug = textAt(one.value, "slug")
    if (slug !== null) found.set(slug, one.path)
  }
  return found
}

export function unionOf(closures: ReadonlyMap<string, ReadonlySet<string>>): ReadonlySet<string> {
  const found = new Set<string>()
  for (const built of closures.values()) for (const one of built) found.add(one)
  return found
}

export function touchedIn(
  closures: ReadonlyMap<string, ReadonlySet<string>>,
  changed: readonly string[] | null
): ReadonlySet<string> {
  if (changed === null) return new Set(closures.keys())
  const found = new Set<string>()
  for (const [slug, built] of closures) {
    if (changed.some((one) => built.has(one))) found.add(slug)
  }
  return found
}

function builtInFolder(
  closures: ReadonlyMap<string, ReadonlySet<string>>,
  folder: string
): readonly string[] {
  const found: string[] = []
  for (const [slug, built] of closures) {
    for (const one of built) {
      if (folderOf(one) === folder) {
        found.push(slug)
        break
      }
    }
  }
  return found
}

export function heldBackIn(
  closures: ReadonlyMap<string, ReadonlySet<string>>,
  blamed: readonly string[]
): ReadonlySet<string> {
  const found = new Set<string>()
  for (const one of blamed) {
    const holding = builtInFolder(closures, folderOf(one))
    if (holding.length === 0) return new Set(closures.keys())
    for (const slug of holding) found.add(slug)
  }
  return found
}

export function narrowedTo(
  closures: ReadonlyMap<string, ReadonlySet<string>>,
  slugs: ReadonlySet<string>
): ReadonlyMap<string, ReadonlySet<string>> {
  const found = new Map<string, ReadonlySet<string>>()
  for (const [slug, built] of closures) if (slugs.has(slug)) found.set(slug, built)
  return found
}

export function closureFor(
  root: string,
  slug: string,
  read: Named,
  commit: string
): ReadonlySet<string> {
  const pages = pagesAt(root, commit)
  return closureIn(readingAt(root, commit, pages), root, slug, read, pages)
}

const STYLED = ".css"

const STYLE_IMPORT = /@import\s+["']([^"']+\.css)["']/g

const OWN = `${akasha.slug}/`

const HERE_ON = "."

export function styledFrom(carried: readonly string[], bodyAt: Body): readonly string[] {
  const found: string[] = []
  for (const one of carried) {
    if (!one.endsWith(STYLED)) continue
    for (const named of (bodyAt(one) ?? "").matchAll(STYLE_IMPORT)) {
      const spec = named[1]
      if (spec === undefined) continue
      if (spec.startsWith(OWN)) found.push(spec.slice(OWN.length))
      else if (spec.startsWith(HERE_ON)) found.push(join(folderOf(one), spec))
    }
  }
  return found
}

export function builtFrom(
  root: string,
  slug: string,
  pagePath: string,
  commit: string
): readonly string[] {
  const tracked = trackedAt(root, commit)
  const every = new Set(tracked)
  const bodyAt = memoized(bodiesFrom(root, commit))
  const pages = pagesAt(root, commit)
  const asked = { index: indexOver(pages), bodyAt, through: (one: string) => every.has(one) }
  const named = new Map<string, readonly string[]>()
  const seeds = seedsFor(root, slug, { kind: WEB_APP, pagePath }, tracked, pages)
  let held = [...new Set(seeds)].filter((one) => every.has(one))
  for (;;) {
    const carried = carriedOver(tracked, reachOf(held, tracked, asked, named), [])
    const grown = [...new Set([...carried, ...styledFrom(carried, bodyAt)])]
    const next = grown.filter((one) => every.has(one))
    if (next.length === held.length) return next
    held = next
  }
}
