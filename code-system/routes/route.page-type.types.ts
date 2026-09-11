import type { RouteCode } from "akasha/code-system/routes/properties/route-code.code-file-property.types.ts"
import type { RouteTest } from "akasha/code-system/routes/properties/route-test.code-file-property.types.ts"
import type { UrlPath } from "akasha/code-system/routes/properties/url-path.text-property.types.ts"
import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export type Route = Domain & {
  code: RouteCode
  test?: RouteTest
  urlPath?: UrlPath
}
