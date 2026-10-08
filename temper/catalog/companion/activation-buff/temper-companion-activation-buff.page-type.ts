import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperCompanionActivationBuff = {
  id: "01a05fcd-41a7-7f50-b3d4-a62fb6c122e1",
  type: "page-type/page-type",
  slug: "temper-companion-activation-buff",
  definition: "a sort of buff a companion ability grants on activation",
  extends: ["page-type/temper-companion-thing"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "text-property/effect-category", required: false, many: false },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-02T01:48:02.343Z",
  updatedAt: "2026-09-26T18:25:50.000Z",
} as const satisfies PageType
