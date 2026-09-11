import type { Change } from "akasha/pages/change/change.module.code.ts"
import type { Shadow } from "akasha/pages/shadow/shadow.module.code.ts"
import {
  input,
  type Selector,
  textIn,
} from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { APP, insideAnApp } from "../../../modules/router-app-code/router-app-code.module.code.ts"
import {
  type Asking,
  refusalsOver,
} from "./browser-code-reads-the-environment-by-a-name.code-check.decision.code.ts"

const NONE: ReadonlyMap<string, string | null> = new Map()

export function askingIn(change: Change, shadow: Shadow): Asking {
  return {
    appsFiled: () => shadow.index.everyOfType(APP).map((one) => one.path),
    namedFilesOf: (pageTypeSlug) => shadow.index.filePropertiesAt().get(pageTypeSlug) ?? NONE,
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

export const browserCodeReadsTheEnvironmentByAName = input(APP_CODE, refusalsIn)
