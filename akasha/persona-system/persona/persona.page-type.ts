import type { Domain } from "../../domain-system/domain/domain.page-type.ts"
import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"

export type Persona = Domain

export const persona = {
  id: "01a0532a-a54d-76e7-98f5-57ff3efc6492",
  pageTypeSlug: "page-type",
  slug: "persona",
  definition: "a part of Alan's life personified as someone who answers for it",
  pluralSlug: "personas",
  extendsSlug: "page-type/domain",
  invariants: [
    {
      invariantKind: "stopgap",
      statement:
        "This states none of what a persona holds, so the old persona stands until each property is reviewed and moved.",
    },
  ],
} as const satisfies PageType
