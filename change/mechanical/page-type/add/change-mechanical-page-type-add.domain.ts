import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const changeMechanicalPageTypeAdd = {
  id: "01a09c5c-dc1b-77e2-a464-b112c07559a1",
  type: "page-type/domain",
  slug: "change-mechanical-page-type-add",
  definition: "a mechanical change that adds a property to a page type",
  parts: [
    "change-mechanical-page-type/add-file-property-extensions",
    "change-mechanical-page-type/add-page-property-types",
    "change-mechanical-page-type/add-page-type-types",
    "change-mechanical-page-type/add-property-to-every-page",
    "change-mechanical-page-type/add-property-to-page-type",
    "change-mechanical-page-type/copy-entry-key-on-every-page",
    "change-mechanical-page-type/copy-property-on-every-page",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A rung here answers the whole scope of one act in one answer.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No rung here takes a key away.",
    },
  ],
} as const satisfies Domain
