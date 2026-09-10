import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const alanWebCapacitorPageDetail = {
  id: "01a08316-d65f-7dd3-b501-68d2553b9c71",
  pageTypeSlug: "route",
  type: "route",
  slug: "alan-web-capacitor-page-detail",
  definition:
    "one page of any page type, read on a screen of its own inside the shell on his phone",
  code: "tsx",
  urlPath: ":pageTypeSlug/:pageHrefParam",
} as const satisfies Route
