import type { RouteCode } from "akasha/code/route/properties/route-code.code-file-property.types.ts"
import type { RouteTest } from "akasha/code/route/properties/route-test.code-file-property.types.ts"
import type { UrlPath } from "akasha/code/route/properties/url-path.text-property.types.ts"
import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export type Route = Domain & {
  code: RouteCode
  test?: RouteTest
  urlPath?: UrlPath
}
