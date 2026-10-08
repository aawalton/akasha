import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const authorityKind = {
  id: "01a0542d-0f76-7ac0-97f4-c19e1d035437",
  type: "page-type/page-type",
  slug: "authority-kind",
  definition: "which sort of act an authority permits",
  parts: [
    "authority-kind/domain",
    "authority-kind/feature-approval",
    "authority-kind/feature-request",
    "authority-kind/page-data",
    "authority-kind/page-schema",
  ],
  extends: ["page-type/domain"],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-08-30T19:37:14.358Z",
  updatedAt: "2026-09-15T15:39:28.000Z",
} as const satisfies PageType
