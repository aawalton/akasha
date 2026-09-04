import type { Domain } from "@akasha/domains/domain"
import type { PageType } from "@akasha/pages-system/page-type"
import type { AmbientTypes } from "./properties/ambient-types.file-property.ts"

export type TypeDeclaration = Domain & {
  d: AmbientTypes
}

export const typeDeclaration = {
  id: "01a0605a-98f4-7c54-8030-4fec48465bda",
  pageTypeSlug: "page-type",
  slug: "type-declaration",
  definition: "types a compiler reads about code it does not hold",
  pluralSlug: "type-declarations",
  partSlugs: ["file-property/ambient-types"],
  extendsSlug: ["page-type/domain"],
  properties: [{ pagePropertySlug: "ambient-types", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A type declaration's TypeScript is held in a file beside the page.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing here is compiled into anything that runs.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration describing globals states no import at its top level.",
    },
    {
      invariantKind: "departure",
      statement: "What a declaration describes is written in another language or by a generator.",
    },
    {
      invariantKind: "departure",
      statement: "A module states its own types.",
    },
    {
      invariantKind: "departure",
      statement: "No declaration file is written beside a module.",
    },
  ],
} as const satisfies PageType
