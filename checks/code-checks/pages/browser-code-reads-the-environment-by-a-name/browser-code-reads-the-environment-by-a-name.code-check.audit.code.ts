import {
  type Asking,
  refusalsOver,
} from "akasha/checks/code-checks/pages/browser-code-reads-the-environment-by-a-name/browser-code-reads-the-environment-by-a-name.code-check.decision.code.ts"
import { bodyOf, onDisk } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { APP } from "akasha/checks/modules/router-app-code/router-app-code.module.code.ts"
import { filePropertiesAt } from "akasha/pages/indexes/entries/index-entries.module.code.ts"
import { everyOfType, everyPath } from "akasha/pages/indexes/reading/index-reading.module.code.ts"

const NONE: ReadonlyMap<string, string | null> = new Map()

export function askingAt(root: string, paths: readonly string[]): Asking {
  const disk = onDisk(root)
  return {
    appsFiled: () => everyOfType(root, APP).map((one) => one.path),
    namedFilesOf: (pageTypeSlug) => filePropertiesAt(root).get(pageTypeSlug) ?? NONE,
    everyPath: () => paths,
    textAt: (path) => {
      const bytes = disk(path)
      return bytes === null ? null : bodyOf({ root, path, bytes })
    },
  }
}

export function browserCodeReadsTheEnvironmentByAName(root: string): readonly Judged[] {
  const paths = everyPath(root)
  return refusalsOver(paths, askingAt(root, paths))
}
