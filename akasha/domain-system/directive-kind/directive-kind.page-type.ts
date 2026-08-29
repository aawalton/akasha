import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"
import type { Domain } from "../domain/domain.page-type.ts"

export type DirectiveKind = Domain

export const directiveKind = {
  id: "01a04e1f-cbf6-755d-bd7d-e46ba13c0087",
  pageTypeSlug: "page-type",
  slug: "directive-kind",
  definition: "which sort one directive is",
  partSlugs: ["directive-kind/principle", "directive-kind/rule"],
  extendsSlug: "page-type/domain",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Every kind of directive stands as the same four lines, and differs in what it is.",
    },
  ],
} as const satisfies PageType
