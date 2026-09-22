import {
  type Asking,
  refusalsOver,
} from "akasha/check/code/pages/browser-code-reads-the-environment-by-a-name/browser-code-reads-the-environment-by-a-name.check-code.decision.code.ts"
import { commitIn } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import {
  APP,
  folderOf,
  pathsUnderIn,
} from "akasha/check/modules/router-app-code/router-app-code.module.code.ts"

const NONE: ReadonlyMap<string, string | null> = new Map()

export function askingAt(root: string): Asking {
  const commit = commitIn(root)
  const held = new Map<string, readonly string[]>()
  return {
    appsFiled: () => commit.index.everyOfType(APP).map((one) => one.path),
    namedFilesOf: (pageTypeSlug) => commit.index.filePropertiesAt().get(pageTypeSlug) ?? NONE,
    pathsUnder: (at) => {
      const found = held.get(at)
      if (found !== undefined) return found
      const made = pathsUnderIn(commit.paths, at)
      held.set(at, made)
      return made
    },
    textAt: commit.read,
  }
}

export function browserCodeReadsTheEnvironmentByAName(root: string): readonly Judged[] {
  const asking = askingAt(root)
  const paths = asking.appsFiled().flatMap((one) => asking.pathsUnder(folderOf(one)))
  return refusalsOver(paths, asking)
}
