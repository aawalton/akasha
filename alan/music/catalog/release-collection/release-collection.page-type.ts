import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const releaseCollection = {
  id: "01a06807-be66-7008-9e51-2703ac729611",
  type: "page-type/page-type",
  slug: "release-collection",
  definition: "a shelf of releases Alan keeps together",
  extends: ["page-type/collection"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T16:08:53.094Z",
  updatedAt: "2026-09-15T15:36:18.000Z",
} as const satisfies PageType
