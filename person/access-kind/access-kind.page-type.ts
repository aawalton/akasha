import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const accessKind = {
  id: "01a0542d-0f75-73b3-a578-8d20baddb655",
  type: "page-type/page-type",
  slug: "access-kind",
  definition: "which sort of thing an access reaches",
  parts: [
    "access-kind/database-row",
    "access-kind/domain",
    "access-kind/page-type",
    "access-kind/route",
  ],
  extends: ["page-type/domain"],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-08-30T19:37:14.357Z",
  updatedAt: "2026-09-15T15:39:28.000Z",
} as const satisfies PageType
