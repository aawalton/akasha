import type { PageType } from "../types/page-type.page-type.types.ts"

export const urlProperty = {
  id: "01a063de-2c60-7000-97f0-b6451df11654",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "url-property",
  definition: "a page property with a web address",
  pluralSlug: "url-properties",
  extends: ["page-type/page-property"],
  properties: [{ pageProperty: "number-property/max-length", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A web address has the scheme the address is reached over.",
    },
    {
      invariantKind: "departure",
      statement: "A web address is followed rather than read.",
    },
  ],
  types: "ts",
} as const satisfies PageType
