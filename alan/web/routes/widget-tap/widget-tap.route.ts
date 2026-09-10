import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const widgetTap = {
  id: "01a078aa-cea2-7140-b891-15301912614a",
  pageTypeSlug: "route",
  type: "route",
  slug: "widget-tap",
  definition: "a tap on one of Alan's widgets, counted on the widget the tap opened",
  code: "ts",
  test: "ts",
  urlPath: "api/widget-tap",
} as const satisfies Route
