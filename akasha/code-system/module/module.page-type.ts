import type { Domain } from "../../domain-system/domain/domain.page-type.ts"
import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"
import type { Code } from "./properties/code.page-property-type.ts"
import type { Test } from "./properties/test.page-property-type.ts"

export type Module = Domain & {
  code: Code
  test?: Test
}

export const module = {
  id: "01a04a20-6e04-7b99-81a0-0efe0ad0a02a",
  pageTypeSlug: "page-type",
  slug: "module",
  definition: "code reached by importing it",
  extendsSlug: "page-type/domain",
  properties: [
    { propertySlug: "page-property-type/code", required: true, many: false },
    { propertySlug: "page-property-type/test", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A module's code is a page property, held in a file beside the page.",
    },
    {
      invariantKind: "departure",
      statement: "A module page states what its code is for; the code states how.",
    },
    {
      invariantKind: "departure",
      statement: "A module's test is a page property of its own, beside its code.",
    },
  ],
} as const satisfies PageType
