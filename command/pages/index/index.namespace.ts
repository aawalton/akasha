import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const index = {
  id: "01a08cc2-e9c6-72ff-91b4-a753fc83eee2",
  type: "page-type/namespace",
  slug: "index",
  definition: "the index over the pages this repository holds",
  parts: ["command/index-refresh"],
  name: "index",
  createdAt: "2026-09-10T19:19:39.206Z",
  updatedAt: "2026-09-15T15:51:21.000Z",
} as const satisfies Namespace
