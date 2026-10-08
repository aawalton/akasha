import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const worldMiracle = {
  id: "01a06558-a991-7a2a-abd8-460809b4f867",
  type: "page-type/page-type",
  slug: "world-miracle",
  definition: "an ability a character works from faith rather than magic",
  pluralSlug: "miracles",
  extends: ["page-type/world-mechanic"],
  runsTabooCheck: false,
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T03:38:24.529Z",
  updatedAt: "2026-09-19T11:25:39.000Z",
} as const satisfies PageType
