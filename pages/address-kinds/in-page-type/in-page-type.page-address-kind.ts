import type { PageAddressKind } from "../page-address-kind.page-type.ts"

export const inPageType = {
  id: "01a0731d-f93f-7a75-9681-507d854cc958",
  pageTypeSlug: "page-address-kind",
  type: "page-address-kind",
  slug: "in-page-type",
  definition: "an address naming a page by a value unique among the pages of its type",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This kind answers the unique kind `page-type`.",
    },
    {
      invariantKind: "departure",
      statement: "The index answers this kind under the page type named.",
    },
    {
      invariantKind: "departure",
      statement: "An address of this kind names the property the value is read by.",
    },
    {
      invariantKind: "departure",
      statement: "A page type with more than one such property is why the property is named.",
    },
  ],
} as const satisfies PageAddressKind
