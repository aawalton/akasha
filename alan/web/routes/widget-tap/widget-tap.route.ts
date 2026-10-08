import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const widgetTap = {
  id: "01a078aa-cea2-7140-b891-15301912614a",
  type: "page-type/route",
  slug: "widget-tap",
  definition: "a tap on one of Alan's widgets, counted on the widget the tap opened",
  code: "ts",
  test: "ts",
  urlPath: "api/widget-tap",
  createdAt: "2026-09-06T21:40:55.074Z",
  updatedAt: "2026-09-15T16:44:30.000Z",
} as const satisfies Route
