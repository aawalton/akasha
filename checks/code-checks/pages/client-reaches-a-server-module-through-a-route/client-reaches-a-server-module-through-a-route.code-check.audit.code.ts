import {
  type Asking,
  refusalsOver,
} from "akasha/checks/code-checks/pages/client-reaches-a-server-module-through-a-route/client-reaches-a-server-module-through-a-route.code-check.decision.code.ts"
import { bodyOf, onDisk } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import {
  APP,
  folderOf,
  pathsUnder,
} from "akasha/checks/modules/router-app-code/router-app-code.module.code.ts"
import { filePropertiesAt } from "akasha/pages/index/modules/entries/index-entries.module.code.ts"
import {
  everyOfType,
  valueByPath,
} from "akasha/pages/index/modules/reading/index-reading.module.code.ts"
import { shadowAt } from "akasha/pages/modules/shadow/shadow.module.code.ts"

const NONE: ReadonlyMap<string, string | null> = new Map()

export function askingAt(root: string): Asking {
  const disk = onDisk(root)
  const shadow = shadowAt(root)
  const held = new Map<string, readonly string[]>()
  return {
    appsFiled: () => everyOfType(root, APP).map((one) => one.path),
    valueAt: (path) => valueByPath(root, path),
    namedFilesOf: (pageTypeSlug) => filePropertiesAt(root).get(pageTypeSlug) ?? NONE,
    pathsUnder: (at) => {
      const found = held.get(at)
      if (found !== undefined) return found
      const made = pathsUnder(shadow, at)
      held.set(at, made)
      return made
    },
    textAt: (path) => {
      const bytes = disk(path)
      return bytes === null ? null : bodyOf({ root, path, bytes })
    },
  }
}

export function clientReachesAServerModuleThroughARoute(root: string): readonly Judged[] {
  const asking = askingAt(root)
  const paths = asking.appsFiled().flatMap((one) => asking.pathsUnder(folderOf(one)))
  return refusalsOver(paths, asking)
}
