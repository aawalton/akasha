import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const releaseCollection = {
  id: "01a06807-be66-7008-9e51-2703ac729611",
  type: "page-type/page-type",
  slug: "release-collection",
  definition: "a collection of releases Alan keeps",
  extends: ["page-type/collection"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T16:08:53.094Z",
  updatedAt: "2026-10-30T16:35:12.156Z",
} as const satisfies PageType
