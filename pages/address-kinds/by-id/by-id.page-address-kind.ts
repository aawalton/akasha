import type { PageAddressKind } from "../page-address-kind.page-type.ts"

export const byId = {
  id: "01a0731d-f93e-7ca8-8fdd-a8a5e083664d",
  pageTypeSlug: "page-address-kind",
  slug: "by-id",
  definition: "an address naming a page by the id that page keeps for life",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This kind answers the level `page`.",
    },
    {
      invariantKind: "departure",
      statement: "An address of this kind names the property the value is read by.",
    },
    {
      invariantKind: "absence",
      statement: "An address of this kind names no page type.",
    },
  ],
} as const satisfies PageAddressKind
