import { dirname } from "node:path"
import {
  type Asking,
  refusalsOver,
} from "akasha/checks/code-checks/pages/held-addon-names-a-roster-addon/held-addon-names-a-roster-addon.code-check.decision.code.ts"
import { bodyOf, onDisk } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { shadowAt } from "akasha/pages/shadow/shadow.module.code.ts"

export function askingAt(root: string): Asking {
  const shadow = shadowAt(root)
  const disk = onDisk(root)
  return {
    pathsOfType: (pageTypeSlug) => shadow.index.everyOfType(pageTypeSlug).map((one) => one.path),
    valueAt: (path) => shadow.index.pageByPath(path),
    folderOf: (pageTypeSlug, slug) => {
      const one = shadow.index.listedAt(pageTypeSlug, slug)[0]
      return one === undefined ? null : dirname(one.path)
    },
    textAt: (path) => {
      const bytes = disk(path)
      return bytes === null ? null : bodyOf({ root, path, bytes })
    },
  }
}

export function heldAddonNamesARosterAddon(root: string): readonly Judged[] {
  return refusalsOver(askingAt(root))
}
