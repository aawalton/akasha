import { typeScripted } from "akasha/code/file-kind/file-kind.module.code.ts"
import { sharedBuildFiles } from "akasha/code/ios-apps/shared-build-files/shared-build-files.module.code.ts"
import { folderOf } from "akasha/code/path-between/code-path-between.module.code.ts"
import { reachedFrom } from "akasha/code/stylesheets/source-globbing/source-globbing.module.code.ts"
import {
  IOS_APP,
  type Named,
  WEB_APP,
  WORKSTATION_SERVICE,
} from "akasha/commands/pages/deploy/kind-reading/deploy-kind-reading.module.code.ts"
import { bodyAt as bodyInCommit } from "akasha/git/commit-reading/commit-reading.module.code.ts"
import { said } from "akasha/git/running/git-running.module.code.ts"
import { deployableNamed } from "akasha/infrastructure/services/clusters/web-app-reading/web-app-reading.module.code.ts"
import { runnerCodeIn } from "akasha/infrastructure/services/workstations/service-reading/service-reading.module.code.ts"
import {
  type Body,
  manifestsAmong,
  reachingOf,
} from "akasha/pages/indexes/package-reaching/package-reaching.module.code.ts"
import {
  everyOfType,
  valuesOfType,
} from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { textAt } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

const MANIFEST = "package.json"

const APART = "\0"

export function trackedAt(root: string, commit: string): readonly string[] {
  const held = said(root, ["ls-tree", "-r", "-z", "--name-only", commit]).split(APART)
  return held.filter((one) => one !== "")
}

export function bodiesFrom(root: string, commit: string): Body {
  const reading = new TextDecoder()
  return (path) => {
    const held = bodyInCommit(root, commit, path)
    return held === null ? null : reading.decode(held)
  }
}

export function codeBodies(bodyAt: Body): Body {
  return (path) => (typeScripted(path) ? bodyAt(path) : null)
}

export function underFolder(tracked: readonly string[], folder: string): readonly string[] {
  const lead = folder === "" ? "" : `${folder}/`
  return tracked.filter((one) => one.startsWith(lead))
}

export function besideThe(tracked: readonly string[], pagePath: string): readonly string[] {
  return underFolder(tracked, folderOf(pagePath))
}

export function webSeeds(
  root: string,
  slug: string,
  tracked: readonly string[]
): readonly string[] {
  const read = deployableNamed(root, slug)
  if ("refused" in read) return []
  const app = read.deployable
  return [
    app.servicePath,
    app.manifestPath,
    app.synthPath,
    ...underFolder(tracked, app.sourceDirectory),
  ]
}

export function iosSeeds(root: string): readonly string[] {
  const shared = sharedBuildFiles(root)
  return "why" in shared ? [] : shared.files
}

export function everySeed(
  root: string,
  kind: string,
  tracked: readonly string[]
): readonly string[] {
  const found: string[] = []
  for (const one of everyOfType(root, kind)) found.push(...besideThe(tracked, one.path))
  return found
}

export function seedsFor(
  root: string,
  slug: string,
  read: Named,
  tracked: readonly string[]
): readonly string[] {
  if (read.every === true) return everySeed(root, read.kind, tracked)
  const beside = besideThe(tracked, read.pagePath)
  if (read.kind === WEB_APP) return [...beside, ...webSeeds(root, slug, tracked)]
  if (read.kind === IOS_APP) return [...beside, ...iosSeeds(root)]
  return beside
}

export function closureOver(
  tracked: readonly string[],
  seeds: readonly string[],
  bodyAt: Body
): ReadonlySet<string> {
  const naming = reachingOf(manifestsAmong(tracked, MANIFEST), bodyAt)
  return reachedFrom(seeds, codeBodies(bodyAt), naming, new Set(tracked))
}

export function kindSeeds(root: string, kind: string): readonly string[] {
  return kind === WORKSTATION_SERVICE ? runnerCodeIn(root) : []
}

export function closuresOf(
  root: string,
  kind: string,
  commit: string
): ReadonlyMap<string, ReadonlySet<string>> {
  const tracked = trackedAt(root, commit)
  const bodies = bodiesFrom(root, commit)
  const shared = kindSeeds(root, kind)
  const found = new Map<string, ReadonlySet<string>>()
  for (const one of valuesOfType(root, kind)) {
    const slug = textAt(one.value, "slug")
    if (slug === null) continue
    found.set(slug, closureOver(tracked, [...besideThe(tracked, one.path), ...shared], bodies))
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

export function closureFor(
  root: string,
  slug: string,
  read: Named,
  commit: string
): ReadonlySet<string> {
  const tracked = trackedAt(root, commit)
  return closureOver(tracked, seedsFor(root, slug, read, tracked), bodiesFrom(root, commit))
}
