import { APP } from "akasha/check/modules/router-app-code/router-app-code.module.code.ts"
import { staged } from "akasha/check/test-fixtures/staging/check-staging.test-fixture.code.ts"
import {
  listedFiled,
  valueAlsoFiled,
} from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"

const SLUG = "web"

export const APP_PAGE = "web/web.router-app.ts"

export const APP_PLAIN = "web/panel/panel.module.code.tsx"

export const APP_PLAIN_PAGE = "web/panel/panel.module.ts"

export const APP_HELD = "export const held = 1\n"

export function appRooted(id: string, also: readonly string[] = []): string {
  const paths = [APP_PAGE, APP_PLAIN, ...also]
  const root = staged(Object.fromEntries(paths.map((one) => [one, APP_HELD])))
  listedFiled(root, APP, SLUG, [{ path: APP_PAGE, id }])
  valueAlsoFiled(root, APP, [{ path: APP_PAGE, value: { id, pageTypeSlug: APP, slug: SLUG } }])
  return root
}
