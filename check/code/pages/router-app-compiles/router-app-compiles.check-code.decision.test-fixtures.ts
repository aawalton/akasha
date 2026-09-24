import {
  APP,
  APP_FILES,
  laidOver,
  linkedPackages,
} from "akasha/check/code/pages/router-app-compiles/modules/route-typegen/route-typegen.module.test-fixtures.ts"
import type { Laying } from "akasha/check/code/pages/router-app-compiles/router-app-compiles.check-code.decision.code.ts"
import {
  bodied,
  named,
  staged,
} from "akasha/check/test-fixtures/staging/check-staging.test-fixture.code.ts"
import { textOf } from "akasha/code/body/modules/body-text/body-text.module.code.ts"
import { routerApp } from "akasha/code/router-app/router-app.page-type.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

const APP_ID = "01a0ca00-1d3b-7a41-9b1e-4f1b3c2d5e60"

const APP_SLUG = "held-web"

const APP_PAGE_AT = `${APP}/${APP_SLUG}.${routerApp.slug}.ts`

export const APART_AT = "akasha/apart.ts"

const APP_TYPE = `${pageType.slug}/${routerApp.slug}`

const APP_PAGE = bodied({ id: APP_ID, type: APP_TYPE, slug: APP_SLUG })

export function appStaged(over: Readonly<Record<string, string>> = {}): string {
  const root = staged({
    ...APP_FILES,
    [APP_PAGE_AT]: APP_PAGE,
    [APART_AT]: "export const apart = 1\n",
    ...over,
  })
  named(root, APP_PAGE_AT, routerApp.slug, APP_SLUG, APP_ID)
  return linkedPackages(root)
}

export function layingOver(root: string, over: Readonly<Record<string, string | null>>): Laying {
  const laid = laidOver(root, over)
  const every = new Set([...Object.keys(APP_FILES), ...Object.keys(over)])
  return {
    root,
    paths: [...every].filter((one) => laid(one) !== null).sort(),
    changed: Object.keys(over).sort(),
    read: (path) => textOf(laid(path)),
    laid,
    placed: new Map(),
  }
}
