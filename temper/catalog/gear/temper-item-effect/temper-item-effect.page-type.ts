import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperItemEffect = {
  id: "01a1846d-f5bd-76b9-b1fa-234991eec2b4",
  type: "page-type/page-type",
  slug: "temper-item-effect",
  definition: "an effect a set, a trait or a glyph sets off under an ability id of its own",
  extends: ["page-type/temper-ability"],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-10-28T21:32:41.276Z",
  updatedAt: "2026-10-28T21:32:41.276Z",
} as const satisfies PageType
