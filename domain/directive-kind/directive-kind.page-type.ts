import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const directiveKind = {
  id: "01a04e1f-cbf6-755d-bd7d-e46ba13c0087",
  type: "page-type/page-type",
  slug: "directive-kind",
  definition: "which sort a directive is",
  parts: ["directive-kind/principle", "directive-kind/rule"],
  extends: ["page-type/domain"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every kind of directive is the same four lines and differs in that kind's definition.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-08-29T15:25:01.814Z",
  updatedAt: "2026-09-22T10:09:39.000Z",
} as const satisfies PageType
