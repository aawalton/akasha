import {
  type Asking,
  refusalsOver,
} from "akasha/check/code/pages/browser-code-reads-the-environment-by-a-name/browser-code-reads-the-environment-by-a-name.check-code.decision.code.ts"
import {
  input,
  type Selector,
  textIn,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import {
  APP,
  insideAnApp,
  pathsUnder,
} from "akasha/check/modules/router-app-code/router-app-code.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"

const NONE: ReadonlyMap<string, string | null> = new Map()

export function askingIn(change: Change, shadow: Shadow): Asking {
  return {
    appsFiled: () => shadow.index.everyOfType(APP).map((one) => one.path),
    namedFilesOf: (pageTypeSlug) => shadow.index.filePropertiesAt().get(pageTypeSlug) ?? NONE,
    pathsUnder: (at) => pathsUnder(shadow, at),
    textAt: (path) => textIn(change, path),
  }
}

const APP_CODE: Selector<string> = {
  named: "the code a router app's package holds",
  isInput: insideAnApp,
  from: (change, shadow) => change.changed.filter((one) => insideAnApp(one, shadow)),
}

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  return refusalsOver(change.changed, askingIn(change, shadow))
}

export const browserCodeReadsTheEnvironmentByAName = input(APP_CODE, refusalsIn)
