import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const chapterWrite = {
  id: "01a0e971-8b9c-7b1d-9608-751764baccdb",
  type: "page-type/route",
  slug: "chapter-write",
  definition: "the next chapter of a written story, started from that story's page",
  code: "ts",
  test: "ts",
  urlPath: "api/chapter-write",
} as const satisfies Route
