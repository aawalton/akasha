import { dirname } from "node:path"
import { shadowAt } from "@akasha/pages/shadow"
import { bodyOf, onDisk } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import {
  type Asking,
  refusalsOver,
} from "./held-addon-names-a-roster-addon.code-check.decision.code.ts"

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
