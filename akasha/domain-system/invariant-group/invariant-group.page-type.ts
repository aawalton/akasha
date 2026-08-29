import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"
import type { Domain } from "../domain/domain.page-type.ts"

export type InvariantGroup = Domain

export const invariantGroup = {
  id: "01a04e11-9f97-7f42-bb41-d519ae123a65",
  pageTypeSlug: "page-type",
  slug: "invariant-group",
  definition: "the standing an invariant has",
  partSlugs: ["invariant-group/condition", "invariant-group/design", "invariant-group/intent"],
  extendsSlug: "page-type/domain",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A group is read off the kinds that name it, never stored as a list of them.",
    },
  ],
} as const satisfies PageType
