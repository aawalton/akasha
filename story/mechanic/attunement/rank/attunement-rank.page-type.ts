import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const attunementRank = {
  id: "01a0ca71-1736-7505-9546-ec713abf469a",
  type: "page-type/page-type",
  slug: "attunement-rank",
  definition: "a rung on the ladder of control over an element",
  pluralSlug: "ranks",
  extends: ["page-type/mechanic"],
  parts: ["number-property/attunement-rank-cap", "page-type/tower-attunement-rank"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "number-property/attunement-rank-cap", required: true, many: false },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
