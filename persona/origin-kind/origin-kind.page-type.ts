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
} as const satisfies PageType
