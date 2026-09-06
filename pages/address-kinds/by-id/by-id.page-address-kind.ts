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
      statement: "The index answers this kind under the scope `page`.",
    },
    {
      invariantKind: "departure",
      statement: "This kind answers the reach every page shares.",
    },
    {
      invariantKind: "absence",
      statement: "An address of this kind names no page type and no property.",
    },
    {
      invariantKind: "gap",
      statement:
        "A second property reaching every page leaves this kind unable to say which it names.",
    },
  ],
} as const satisfies PageAddressKind
