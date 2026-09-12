import {
  type Asking,
  refusalsOver,
} from "akasha/checks/code-checks/pages/client-reaches-a-server-module-through-a-route/client-reaches-a-server-module-through-a-route.code-check.decision.code.ts"
import {
  input,
  type Selector,
  textIn,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import {
  APP,
  insideAnApp,
} from "akasha/checks/modules/router-app-code/router-app-code.module.code.ts"
import type { Change } from "akasha/pages/modules/change/change.module.code.ts"
import type { Shadow } from "akasha/pages/shadow/shadow.module.code.ts"

export function askingIn(change: Change, shadow: Shadow): Asking {
  return {
    appsFiled: () => shadow.index.everyOfType(APP).map((one) => one.path),
    valueAt: (path) => shadow.index.pageByPath(path),
    namedFilesOf: (pageTypeSlug) => shadow.index.filePropertiesAt().get(pageTypeSlug) ?? new Map(),
    everyPath: () => shadow.index.everyPath(),
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

export const clientReachesAServerModuleThroughARoute = input(APP_CODE, refusalsIn)
