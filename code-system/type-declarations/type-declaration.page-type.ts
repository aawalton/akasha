import type { PageType } from "@akasha/pages/page-type"
import type { Domain } from "akasha/domains/domain.page-type.ts"
import type { AmbientTypes } from "./properties/ambient-types.file-property.ts"
import type { Generated } from "./properties/generated.record-property.ts"

export type TypeDeclaration = Domain & {
  d: AmbientTypes
  generated?: Generated
}

export const typeDeclaration = {
  id: "01a0605a-98f4-7c54-8030-4fec48465bda",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "type-declaration",
  definition: "types a compiler reads and emits nothing from",
  pluralSlug: "type-declarations",
  parts: [
    "file-property/ambient-types",
    "record-property/generated",
    "text-property/written-by",
    "number-property/source-version",
  ],
  extends: ["page-type/domain"],
  properties: [
    { pageProperty: "file-property/ambient-types", required: true, many: false },
    { pageProperty: "record-property/generated", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A type declaration's TypeScript is in a file beside the page.",
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
      statement:
        "A declaration describes code written elsewhere or types shared between our modules.",
    },
    {
      invariantKind: "departure",
      statement: "A module states the types that module alone uses.",
    },
  ],
} as const satisfies PageType
