import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const connectionActivity = {
  id: "01a0658e-c30d-7f83-bcba-db0766dbd484",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "connection-activity",
  definition: "one way Alan spends time with someone, and what an hour of it is worth to him",
  pluralSlug: "connection-activities",
  extends: ["page-type/page"],
  parts: [
    "boolean-property/connection-activity-repeatable",
    "number-property/connection-activity-attn",
    "number-property/connection-activity-attractiveness",
    "number-property/connection-activity-energy",
    "number-property/connection-activity-femininity",
    "number-property/connection-activity-fitness",
    "number-property/connection-activity-ident",
    "number-property/connection-activity-intensity",
    "number-property/connection-activity-kindness",
    "number-property/connection-activity-maturity",
    "number-property/connection-activity-novelty",
    "number-property/connection-activity-positivity",
    "number-property/connection-activity-seq",
    "number-property/connection-activity-weight",
    "number-property/connection-activity-wit",
    "select-property/connection-activity-category",
    "select-property/connection-activity-modality",
    "select-property/connection-activity-model-basis",
    "select-property/connection-activity-reality",
    "select-property/connection-activity-safety",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "number-property/connection-activity-attn", required: true, many: false },
    {
      pageProperty: "number-property/connection-activity-attractiveness",
      required: true,
      many: false,
    },
    {
      pageProperty: "select-property/connection-activity-category",
      required: true,
      many: false,
    },
    { pageProperty: "number-property/connection-activity-energy", required: true, many: false },
    {
      pageProperty: "number-property/connection-activity-femininity",
      required: true,
      many: false,
    },
    {
      pageProperty: "number-property/connection-activity-fitness",
      required: true,
      many: false,
    },
    { pageProperty: "number-property/connection-activity-ident", required: true, many: false },
    {
      pageProperty: "number-property/connection-activity-intensity",
      required: true,
      many: false,
    },
    {
      pageProperty: "number-property/connection-activity-kindness",
      required: true,
      many: false,
    },
    {
      pageProperty: "number-property/connection-activity-maturity",
      required: true,
      many: false,
    },
    {
      pageProperty: "select-property/connection-activity-modality",
      required: true,
      many: true,
      maxCount: null,
    },
    {
      pageProperty: "select-property/connection-activity-model-basis",
      required: true,
      many: false,
    },
    {
      pageProperty: "number-property/connection-activity-novelty",
      required: true,
      many: false,
    },
    {
      pageProperty: "number-property/connection-activity-positivity",
      required: true,
      many: false,
    },
    {
      pageProperty: "select-property/connection-activity-reality",
      required: true,
      many: false,
    },
    {
      pageProperty: "boolean-property/connection-activity-repeatable",
      required: true,
      many: false,
    },
    { pageProperty: "select-property/connection-activity-safety", required: true, many: false },
    { pageProperty: "number-property/connection-activity-weight", required: true, many: false },
    { pageProperty: "number-property/connection-activity-wit", required: true, many: false },
    { pageProperty: "number-property/connection-activity-seq", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every rating is a multiplier against an ordinary hour.",
    },
    {
      invariantKind: "departure",
      statement:
        "Two activities differing only in how those activities reach Alan are rated apart.",
    },
    {
      invariantKind: "departure",
      statement: "Every rating is on a quarter-step scale from a quarter to two.",
    },
    {
      invariantKind: "absence",
      statement: "The number ordering the activities is no rating.",
    },
    {
      invariantKind: "departure",
      statement: "The multiplier is the fourteen ratings multiplied together.",
    },
    {
      invariantKind: "departure",
      statement:
        "Reality counts a whole for authentic and a half for professional and a quarter for celebrity.",
    },
    {
      invariantKind: "departure",
      statement:
        "Safety counts a quarter at L3 and a half at L4 and three quarters at L5 and a whole at L6.",
    },
    {
      invariantKind: "departure",
      statement: "Modality adds a half for presence.",
    },
    {
      invariantKind: "departure",
      statement: "Modality adds a quarter for audio.",
    },
    {
      invariantKind: "departure",
      statement: "Modality adds 0.15 for digital presence.",
    },
    {
      invariantKind: "departure",
      statement: "Modality adds 0.15 for text.",
    },
    {
      invariantKind: "departure",
      statement: "Modality adds 0.1 for image.",
    },
    {
      invariantKind: "departure",
      statement:
        "An hour of an activity meets the multiplier over thirty-two of his connection need.",
    },
    {
      invariantKind: "departure",
      statement: "It is parasocial where the other person is not authentic.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing worked out from the ratings is stored.",
    },
  ],
  types: "ts",
} as const satisfies PageType
