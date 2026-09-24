import {
  appOf,
  appsAmong,
  appsReached,
  judgedFor,
  type Laying,
} from "akasha/check/code/pages/router-app-compiles/router-app-compiles.check-code.decision.code.ts"
import { mintingIn } from "akasha/check/code/pages/typecheck/modules/page-narrowing/page-narrowing.module.code.ts"
import {
  browserRefusalsOver,
  builtFrom,
  reachedBy,
} from "akasha/check/code/pages/typecheck/typecheck.check-code.decision.code.ts"
import {
  filesBy,
  holdingOver,
  inputAsync,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { textOf } from "akasha/code/body/modules/body-text/body-text.module.code.ts"
import { placingOver } from "akasha/code/reading/modules/code-typing/code-typing.module.code.ts"
import { routerApp } from "akasha/code/router-app/router-app.page-type.ts"
import { waitingKeys } from "akasha/page/index/modules/generated-properties/generated-properties.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { heldPerShadow, type Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"

const appsFor = heldPerShadow((shadow) =>
  appsAmong(shadow.index.everyOfType(routerApp.slug).map((one) => one.path))
)

function taken(path: string, shadow: Shadow): boolean {
  return builtFrom(path) || appOf(path, appsFor(shadow)) !== null
}

const TAKEN = filesBy("the files a router app is compiled from", taken)

function layingOf(change: Change, shadow: Shadow): Laying {
  const now = (path: string): string | null => textOf(change.after(path))
  const index = shadow.index
  const minting = mintingIn(change, [...waitingKeys(shadow)], index)
  const beside = index.manifestsBeside(index.fileKeysAt())
  return {
    root: change.root,
    paths: shadow.listed(),
    changed: change.changed,
    read: (path) => {
      const text = now(path)
      return text === null ? null : minting(path, text)
    },
    laid: change.after,
    placed: placingOver([...new Set([...beside, ...change.changed])], now),
  }
}

async function appsJudged(change: Change, shadow: Shadow): Promise<readonly Judged[]> {
  const reached = [...change.changed, ...reachedBy(change, shadow)]
  const apps = appsReached(reached, appsFor(shadow))
  if (apps.length === 0) return []
  return await judgedFor(apps, layingOf(change, shadow))
}

async function refusalsOver(given: Change, shadow: Shadow): Promise<readonly Judged[]> {
  const change = holdingOver(given)
  const [apps, browser] = await Promise.all([
    appsJudged(change, shadow),
    browserRefusalsOver(change, shadow),
  ])
  return [...apps, ...browser]
}

export const routerAppCompiles = inputAsync(TAKEN, refusalsOver)
