import type { PageType } from "@akasha/pages/page-type"

export const directiveKind = {
  id: "01a04e1f-cbf6-755d-bd7d-e46ba13c0087",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "directive-kind",
  definition: "which sort one directive is",
  pluralSlug: "directive-kinds",
  parts: ["directive-kind/principle", "directive-kind/rule"],
  extends: ["page-type/domain"],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Every kind of directive is the same four lines and differs in that kind's definition.",
    },
  ],
  types: "ts",
} as const satisfies PageType
