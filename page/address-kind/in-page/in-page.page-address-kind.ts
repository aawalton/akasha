import type { PageAddressKind } from "akasha/page/address-kind/page-address-kind.page-type.types.ts"

export const inPage = {
  id: "01a0731d-f93e-7ca8-8fdd-a8a5e083664d",
  type: "page-type/page-address-kind",
  slug: "in-page",
  definition: "an address naming a page by a value unique across every page",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This kind answers the unique kind `page`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An address of this kind names the property the value is read by.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "An address of this kind names no page type.",
    },
  ],
} as const satisfies PageAddressKind
