import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const attunementRank = {
  id: "01a0ca71-1736-7505-9546-ec713abf469a",
  type: "page-type/page-type",
  slug: "attunement-rank",
  definition: "a rung on the ladder of control over an element",
  pluralSlug: "ranks",
  extends: ["page-type/world-rank"],
  parts: ["number-property/attunement-rank-cap", "page-type/tower-attunement-rank"],
  properties: [
    { pageProperty: "number-property/attunement-rank-cap", required: true, many: false },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-22T18:46:44.278Z",
  updatedAt: "2026-09-26T17:59:43.000Z",
} as const satisfies PageType
