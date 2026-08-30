import type { Domain } from "../../domain-system/domain/domain.page-type.ts"
import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"
import type { Code } from "../module/properties/code.file-property.ts"

export type IosComponent = Domain & {
  code: Code
}

export const iosComponent = {
  id: "01a05472-ab84-78cc-8758-9f95622d1b04",
  pageTypeSlug: "page-type",
  slug: "ios-component",
  definition: "code an iOS app is built from",
  pluralSlug: "ios-components",
  partSlugs: ["file-property/code"],
  extendsSlug: "page-type/domain",
  properties: [{ pagePropertySlug: "code", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An iOS component's code is Swift, held in a file beside the page.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing here is imported. Xcode compiles it.",
    },
  ],
} as const satisfies PageType
