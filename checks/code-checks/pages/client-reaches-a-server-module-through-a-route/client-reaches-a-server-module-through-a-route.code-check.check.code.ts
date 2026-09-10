import type { Change } from "@akasha/pages/change"
import type { Shadow } from "@akasha/pages/shadow"
import {
  input,
  type Selector,
  textIn,
  textNamed,
} from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import {
  APP,
  type Asking,
  folderOf,
  refusalsOver,
} from "./client-reaches-a-server-module-through-a-route.code-check.decision.code.ts"

export function askingIn(change: Change, shadow: Shadow): Asking {
  return {
    appsFiled: () => shadow.index.everyOfType(APP).map((one) => one.path),
    valueAt: (path) => shadow.index.pageByPath(path),
    namedFilesOf: (pageTypeSlug) => shadow.index.filePropertiesAt().get(pageTypeSlug) ?? new Map(),
    everyPath: () => shadow.index.everyPath(),
    textAt: (path) => textIn(change, path),
  }
}

const FOLDERS = new WeakMap<Shadow, readonly string[]>()

function foldersFor(shadow: Shadow): readonly string[] {
  const found = FOLDERS.get(shadow)
  if (found !== undefined) return found
  const made = [...new Set(shadow.index.everyOfType(APP).map((one) => folderOf(one.path)))]
  FOLDERS.set(shadow, made)
  return made
}

function insideAnApp(path: string, shadow: Shadow): boolean {
  return textNamed(path) && foldersFor(shadow).some((one) => path.startsWith(one))
}

const APP_CODE: Selector<string> = {
  named: "the code a router app's package holds",
  isInput: insideAnApp,
  from: (change, shadow) => change.changed.filter((one) => insideAnApp(one, shadow)),
}

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  return refusalsOver(change.changed, askingIn(change, shadow))
}

export const clientReachesAServerModuleThroughARoute = input(APP_CODE, refusalsIn)
