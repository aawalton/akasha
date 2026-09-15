import type { PageAddressKind } from "akasha/page/address-kind/page-address-kind.page-type.types.ts"

export const inPageType = {
  id: "01a0731d-f93f-7a75-9681-507d854cc958",
  type: "page-address-kind",
  slug: "in-page-type",
  definition: "an address naming a page by a value unique among the pages of its type",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "This kind answers the unique kind `page-type`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The index answers this kind under the page type named.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An address of this kind names the property the value is read by.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type with more than one such property is why the property is named.",
    },
  ],
} as const satisfies PageAddressKind
