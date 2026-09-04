import type { Domain } from "@akasha/domain-system/domain"
import type { PageType } from "@akasha/pages-system/page-type"

export type Flag = Domain

export const flag = {
  id: "01a06835-e289-76ca-8e3e-0ef012ffdf1a",
  pageTypeSlug: "page-type",
  slug: "flag",
  definition: "a switch held outside the code that reads it",
  pluralSlug: "flags",
  extendsSlug: ["page-type/domain"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A flag is read at the moment it is needed rather than at start-up.",
    },
  ],
} as const satisfies PageType
