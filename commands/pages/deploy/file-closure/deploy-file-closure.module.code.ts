import { folderOf } from "akasha/code/code-path-between/code-path-between.module.code.ts"
import { typeScripted } from "akasha/code/file-kind/file-kind.module.code.ts"
import { sharedBuildFiles } from "akasha/code-system/ios-apps/shared-build-files/shared-build-files.module.code.ts"
import { reachedFrom } from "akasha/commands/modules/source-globbing/source-globbing.module.code.ts"
import {
  IOS_APP,
  type Named,
  WEB_APP,
} from "akasha/commands/pages/deploy/kind-reading/deploy-kind-reading.module.code.ts"
import { said } from "akasha/git/running/git-running.module.code.ts"
import { deployableNamed } from "akasha/infrastructure/services/clusters/web-app-reading/web-app-reading.module.code.ts"
import {
  type Body,
  bodiesAt,
  manifestsAmong,
  reachingOf,
} from "akasha/pages/indexes/package-reaching/package-reaching.module.code.ts"

const MANIFEST = "package.json"

const APART = "\0"

export function trackedIn(root: string): readonly string[] {
  const held = said(root, ["ls-files", "-z"]).split(APART)
  return held.filter((one) => one !== "")
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

export function seedsFor(
  root: string,
  slug: string,
  read: Named,
  tracked: readonly string[]
): readonly string[] {
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

export function closureFor(root: string, slug: string, read: Named): ReadonlySet<string> {
  const tracked = trackedIn(root)
  return closureOver(tracked, seedsFor(root, slug, read, tracked), bodiesAt(root))
}
