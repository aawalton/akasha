import { dirname } from "node:path"
import {
  ADDON,
  type Asking,
  HELD,
  refusalsOver,
} from "akasha/checks/code-checks/pages/held-addon-names-a-roster-addon/held-addon-names-a-roster-addon.code-check.decision.code.ts"
import {
  input,
  textIn,
  textsBy,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { partedIn } from "akasha/pages/file-name/page-file-name.module.code.ts"
import type { Change } from "akasha/pages/modules/change/change.module.code.ts"
import type { Shadow } from "akasha/pages/shadow/shadow.module.code.ts"

export function askingIn(change: Change, shadow: Shadow): Asking {
  return {
    pathsOfType: (pageTypeSlug) => shadow.index.everyOfType(pageTypeSlug).map((one) => one.path),
    valueAt: (path) => shadow.index.pageByPath(path),
    folderOf: (pageTypeSlug, slug) => {
      const one = shadow.index.listedAt(pageTypeSlug, slug)[0]
      return one === undefined ? null : dirname(one.path)
    },
    textAt: (path) => textIn(change, path),
  }
}

export function touches(path: string): boolean {
  const said = partedIn(path)
  return said !== null && (said.pageType === HELD || said.pageType === ADDON)
}

const TOUCHED = textsBy("held addon pages, addon pages and the manifests beside them", touches)

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  return refusalsOver(askingIn(change, shadow))
}

export const heldAddonNamesARosterAddon = input(TOUCHED, refusalsIn)
