import type { Domain } from "../../domain-system/domain/domain.page-type.ts"
import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"

export type ReadoutScale = Domain

export const readoutScale = {
  id: "01a05446-e75f-756a-b8d9-4288a350957f",
  pageTypeSlug: "page-type",
  slug: "readout-scale",
  definition: "what turns a reading into a color",
  pluralSlug: "readout-scales",
  extendsSlug: "page-type/domain",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A scale is named by the readings drawn against it, and belongs to none of them.",
    },
  ],
} as const satisfies PageType
