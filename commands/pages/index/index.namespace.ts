import type { Namespace } from "akasha/commands/namespaces/namespace.page-type.types.ts"

export const index = {
  id: "01a08cc2-e9c6-72ff-91b4-a753fc83eee2",
  type: "namespace",
  slug: "index",
  definition: "the index over the pages this repository holds",
  parts: ["command/index-refresh"],
  name: "index",
} as const satisfies Namespace
