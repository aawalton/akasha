import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const litrpgCollection = {
  id: "01a06807-be66-700a-962a-c99e0bc93be5",
  type: "page-type/page-type",
  slug: "litrpg-collection",
  definition: "a collection of LitRPG stories",
  extends: ["page-type/collection"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T16:08:53.094Z",
  updatedAt: "2026-10-30T15:22:24.982Z",
} as const satisfies PageType
