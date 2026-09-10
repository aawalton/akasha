import type { PageType } from "@akasha/pages/page-type"

export const route = {
  id: "01a071dc-83c4-7030-b380-57eb6c741b5b",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "route",
  definition: "code a router serves under a url path",
  pluralSlug: "routes",
  parts: [
    "code-file-property/route-code",
    "code-file-property/route-test",
    "text-property/url-path",
  ],
  extends: ["page-type/domain"],
  properties: [
    { pageProperty: "code-file-property/route-code", required: true, many: false },
    { pageProperty: "code-file-property/route-test", required: false, many: false },
    { pageProperty: "text-property/url-path", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A route is reached by a url rather than by importing that route.",
    },
    {
      invariantKind: "departure",
      statement: "A route's code is a page property held in a file beside the page.",
    },
    {
      invariantKind: "departure",
      statement: "A route states the url path the router serves that route under.",
    },
    {
      invariantKind: "departure",
      statement: "The route a router serves at its index states no path.",
    },
  ],
  types: "ts",
} as const satisfies PageType
