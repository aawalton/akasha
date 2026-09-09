import { everyOfType, everyPath, valuesByPath } from "@akasha/indexes"
import { filePropertiesAt } from "@akasha/indexes/entries"
import { bodyOf, onDisk } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import {
  APP,
  type Asking,
  refusalsOver,
} from "./client-reaches-a-server-module-through-a-route.code-check.decision.code.ts"

const NONE: ReadonlyMap<string, string | null> = new Map()

export function askingAt(root: string, paths: readonly string[]): Asking {
  const disk = onDisk(root)
  return {
    appsFiled: () => everyOfType(root, APP).map((one) => one.path),
    valueAt: (path) => valuesByPath(root, APP).get(path) ?? null,
    namedFilesOf: (pageTypeSlug) => filePropertiesAt(root).get(pageTypeSlug) ?? NONE,
    everyPath: () => paths,
    textAt: (path) => {
      const bytes = disk(path)
      return bytes === null ? null : bodyOf({ root, path, bytes })
    },
  }
}

export function clientReachesAServerModuleThroughARoute(root: string): readonly Judged[] {
  const paths = everyPath(root)
  return refusalsOver(paths, askingAt(root, paths))
}
