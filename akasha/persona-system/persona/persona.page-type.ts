import type { Domain } from "../../domain-system/domain/domain.page-type.ts"
import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"
import type { RoleSlug } from "../../seat-system/seat/properties/role-slug.text-property.ts"
import type { Portrait } from "./properties/portrait.file-property.ts"
import type { Purpose } from "./properties/purpose.text-property.ts"

export type Persona = Domain & {
  purpose: Purpose
  portrait: Portrait
  roleSlug: RoleSlug
}

export const persona = {
  id: "01a0532a-a54d-76e7-98f5-57ff3efc6492",
  pageTypeSlug: "page-type",
  slug: "persona",
  definition: "a part of Alan's life personified as someone who answers for it",
  pluralSlug: "personas",
  extendsSlug: "page-type/domain",
  partSlugs: ["file-property/portrait", "text-property/purpose", "text-property/role-slug"],
  properties: [
    { pagePropertySlug: "purpose", required: true, many: false },
    { pagePropertySlug: "portrait", required: true, many: false },
    { pagePropertySlug: "role-slug", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "stopgap",
      statement:
        "This states only some of what a persona holds, so the old persona stands until every property is reviewed and moved.",
    },
    {
      invariantKind: "departure",
      statement: "A persona stands alone in a folder, her portrait being a file beside her page.",
    },
  ],
} as const satisfies PageType
