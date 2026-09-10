import type { Domain } from "../../domains/domain.page-type.ts"
import type { RouteCode } from "./properties/route-code.code-file-property.ts"
import type { RouteTest } from "./properties/route-test.code-file-property.ts"
import type { UrlPath } from "./properties/url-path.text-property.ts"

export type Route = Domain & {
  code: RouteCode
  test?: RouteTest
  urlPath?: UrlPath
}
