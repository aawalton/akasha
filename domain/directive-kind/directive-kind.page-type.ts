import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const directiveKind = {
  id: "01a04e1f-cbf6-755d-bd7d-e46ba13c0087",
  type: "page-type/page-type",
  slug: "directive-kind",
  definition: "which sort one directive is",
  parts: ["directive-kind/principle", "directive-kind/rule"],
  extends: ["page-type/domain"],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Every kind of directive is the same four lines and differs in that kind's definition.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
