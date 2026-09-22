import type { ActionButtonProperty } from "akasha/page/action-button-property/action-button-property.page-type.types.ts"

export const featureRequestBoost = {
  id: "01a0c5fd-2524-741a-b098-6e4f917c4189",
  type: "page-type/action-button-property",
  slug: "feature-request-boost",
  propertySlug: "boost",
  definition: "the button committing a contributor's contribution points to a request",
  verbId: "feature-request-boost",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A request takes a boost from the list it is read in rather than a page of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What the button opens is the site's, so a site opening nothing draws it dead.",
    },
  ],
  types: "ts",
} as const satisfies ActionButtonProperty
