import { folderOf } from "akasha/code-system/code-path-between/code-path-between.module.code.ts"
import { typeScripted } from "akasha/code-system/file-kind/file-kind.module.code.ts"
import { reachedFrom } from "akasha/commands/modules/source-globbing/source-globbing.module.code.ts"
import { said } from "akasha/git/running/git-running.module.code.ts"
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

export function besideThe(tracked: readonly string[], pagePath: string): readonly string[] {
  const folder = folderOf(pagePath)
  const lead = folder === "" ? "" : `${folder}/`
  return tracked.filter((one) => one.startsWith(lead))
}

export function closureOver(
  tracked: readonly string[],
  pagePath: string,
  bodyAt: Body
): ReadonlySet<string> {
  const naming = reachingOf(manifestsAmong(tracked, MANIFEST), bodyAt)
  return reachedFrom(besideThe(tracked, pagePath), codeBodies(bodyAt), naming, new Set(tracked))
}

export function closureFor(root: string, pagePath: string): ReadonlySet<string> {
  return closureOver(trackedIn(root), pagePath, bodiesAt(root))
}
