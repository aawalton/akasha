import type { Domain } from "../../domain-system/domain/domain.page-type.ts"
import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"
import type { Purpose } from "./properties/purpose.text-property.ts"

export type Persona = Domain & {
  purpose: Purpose
}

export const persona = {
  id: "01a0532a-a54d-76e7-98f5-57ff3efc6492",
  pageTypeSlug: "page-type",
  slug: "persona",
  definition: "a part of Alan's life personified as someone who answers for it",
  pluralSlug: "personas",
  extendsSlug: "page-type/domain",
  partSlugs: ["text-property/purpose"],
  properties: [{ pagePropertySlug: "purpose", required: true, many: false }],
  invariants: [
    {
      invariantKind: "stopgap",
      statement:
        "This states one of what a persona holds, so the old persona stands until every property is reviewed and moved.",
    },
  ],
} as const satisfies PageType
