import { staged } from "akasha/checks/modules/check-staging/check-staging.module.code.ts"
import { APP } from "akasha/checks/modules/router-app-code/router-app-code.module.code.ts"
import {
  listedFiled,
  valueAlsoFiled,
} from "akasha/pages/indexes/filing/index-filing.module.code.ts"
import { pathFiled } from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"

const SLUG = "web"

export const APP_PAGE = "web/web.router-app.ts"

export const APP_PLAIN = "web/panel/panel.module.code.tsx"

export const APP_HELD = "export const held = 1\n"

export function appRooted(id: string, also: readonly string[] = []): string {
  const paths = [APP_PAGE, APP_PLAIN, ...also]
  const root = staged(Object.fromEntries(paths.map((one) => [one, APP_HELD])))
  listedFiled(root, APP, SLUG, [{ path: APP_PAGE, id }])
  valueAlsoFiled(root, APP, [{ path: APP_PAGE, value: { id, pageTypeSlug: APP, slug: SLUG } }])
  for (const one of paths) pathFiled(root, one, [{ path: one, id }])
  return root
}
