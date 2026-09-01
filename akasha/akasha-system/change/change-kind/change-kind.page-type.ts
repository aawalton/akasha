import type { Domain } from "../../../domain-system/domain/domain.page-type.ts"
import type { PageType } from "../../../pages-system/page-type/page-type.page-type.ts"

export type ChangeKind = Domain

export const changeKind = {
  id: "01a05e11-d3f8-72af-b104-6cdd1255b0eb",
  pageTypeSlug: "page-type",
  slug: "change-kind",
  definition: "which sort one change is",
  pluralSlug: "change-kinds",
  extendsSlug: "page-type/domain",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A change has one kind.",
    },
  ],
} as const satisfies PageType
