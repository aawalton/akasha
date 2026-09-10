import { dirname } from "node:path"
import type { Change } from "@akasha/pages/change"
import { partedIn } from "@akasha/pages/page-file-name"
import type { Shadow } from "@akasha/pages/shadow"
import {
  input,
  textIn,
  textsBy,
} from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import {
  ADDON,
  type Asking,
  HELD,
  refusalsOver,
} from "./held-addon-names-a-roster-addon.code-check.decision.code.ts"

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
