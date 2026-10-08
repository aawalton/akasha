import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const originKind = {
  id: "01a05361-6286-7dcd-a5b1-16a97d9c1932",
  type: "page-type/page-type",
  slug: "origin-kind",
  definition: "the origin of a persona's name",
  parts: [
    "origin-kind/canon",
    "origin-kind/celtic",
    "origin-kind/greek",
    "origin-kind/hebrew",
    "origin-kind/human",
    "origin-kind/invented",
    "origin-kind/norse",
    "origin-kind/sanskrit",
    "origin-kind/welsh",
  ],
  extends: ["page-type/domain"],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-08-30T15:54:46.278Z",
  updatedAt: "2026-09-22T14:05:26.000Z",
} as const satisfies PageType
