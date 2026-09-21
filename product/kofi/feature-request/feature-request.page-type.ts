import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const featureRequest = {
  id: "01a0b79b-96bb-779c-bc1e-65ffdce6bfe0",
  type: "page-type/page-type",
  slug: "feature-request",
  definition: "what a contributor asks Alan to build, said where anyone can read it",
  extends: ["page-type/page"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A feature request is the public face of a want, beside the finding, gap or intent saying it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Alan approves each feature request page himself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Past launch, a feature of the request system is itself a feature request contributors boost.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  parts: [
    "text-property/feature-request-ask",
    "relation-property/feature-request-product",
    "relation-property/feature-request-booster",
    "record-property/feature-request-boosts",
    "select-property/feature-request-standing",
    "module/feature-request-listing",
    "module/feature-request-serving",
    "module/feature-request-naming",
    "module/feature-request-writing",
    "relation-property/feature-request-proposer",
    "module/feature-request-asking",
    "module/feature-request-propose-dialog",
    "module/feature-request-boost-dialog",
    "module/feature-request-posting",
    "action-button-property/feature-request-boost",
  ],
  properties: [
    { pageProperty: "text-property/feature-request-ask", required: true, many: false },
    { pageProperty: "relation-property/feature-request-product", required: true, many: false },
    {
      pageProperty: "record-property/feature-request-boosts",
      required: false,
      many: true,
      maxCount: null,
    },
    {
      pageProperty: "select-property/feature-request-standing",
      required: true,
      many: false,
      default: "proposed",
    },
    { pageProperty: "relation-property/feature-request-proposer", required: true, many: false },
    {
      pageProperty: "action-button-property/feature-request-boost",
      required: false,
      many: false,
    },
  ],
} as const satisfies PageType
