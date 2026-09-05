import type { Route } from "@akasha/code-system/route"

export const inboxStoplights = {
  id: "01a072b2-59cc-72dc-9f34-01e609e3f191",
  pageTypeSlug: "route",
  slug: "inbox-stoplights",
  definition: "Alan's inboxes as the colors their counts reach",
  code: "ts",
  test: "ts",
  urlPath: "api/inbox-stoplights",
} as const satisfies Route
