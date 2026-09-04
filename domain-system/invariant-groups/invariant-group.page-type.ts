import type { PageType } from "@akasha/pages-system/page-type"
import type { Domain } from "../domains/domain.page-type.ts"

export type InvariantGroup = Domain

export const invariantGroup = {
  id: "01a04e11-9f97-7f42-bb41-d519ae123a65",
  pageTypeSlug: "page-type",
  slug: "invariant-group",
  definition: "the standing an invariant has",
  pluralSlug: "invariant-groups",
  partSlugs: ["invariant-group/condition", "invariant-group/design", "invariant-group/intent"],
  extendsSlug: "page-type/domain",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A group is read off the kinds that name the group rather than stored as a list of the kinds.",
    },
  ],
} as const satisfies PageType
