import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const changeMechanicalPageTypeAdd = {
  id: "01a09c5c-dc1b-77e2-a464-b112c07559a1",
  type: "domain",
  slug: "change-mechanical-page-type-add",
  definition: "a mechanical change putting a key on every page of one page type",
  parts: [
    "change-mechanical-page-type/add-file-property-extensions",
    "change-mechanical-page-type/add-page-property-types",
    "change-mechanical-page-type/add-property-to-every-page",
    "change-mechanical-page-type/copy-property-on-every-page",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rung here answers for every page of the page type at once.",
    },
    {
      invariantKind: "absence",
      statement: "No rung here takes a key away.",
    },
  ],
} as const satisfies Domain
