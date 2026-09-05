import type { Domain } from "@akasha/domains/domain"
import type { PageType } from "@akasha/pages-system/page-type"
import type { RouteCode } from "./properties/route-code.file-property.ts"
import type { RouteTest } from "./properties/route-test.file-property.ts"
import type { UrlPath } from "./properties/url-path.text-property.ts"

export type Route = Domain & {
  code: RouteCode
  test?: RouteTest
  urlPath?: UrlPath
}

export const route = {
  id: "01a071dc-83c4-7030-b380-57eb6c741b5b",
  pageTypeSlug: "page-type",
  slug: "route",
  definition: "code a router serves under a url path",
  pluralSlug: "routes",
  partSlugs: ["file-property/route-code", "file-property/route-test", "text-property/url-path"],
  extendsSlug: ["page-type/domain"],
  properties: [
    { pagePropertySlug: "route-code", required: true, many: false },
    { pagePropertySlug: "route-test", required: false, many: false },
    { pagePropertySlug: "url-path", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A route is reached by a url rather than by importing it.",
    },
    {
      invariantKind: "departure",
      statement: "A route's code is a page property held in a file beside the page.",
    },
    {
      invariantKind: "departure",
      statement: "A route states the url path the router serves it under.",
    },
    {
      invariantKind: "departure",
      statement: "The route a router serves at its index states no path.",
    },
  ],
} as const satisfies PageType
