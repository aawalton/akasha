import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperCompanionBaseRole = {
  id: "01a05fce-1851-7d9f-9f36-f8f9bf8792ea",
  type: "page-type/page-type",
  slug: "temper-companion-base-role",
  definition: "a part a companion is built to play",
  extends: ["page-type/temper-companion-thing"],
  parts: [
    "text-property/abbreviation",
    "text-property/valid-armor-weights",
    "text-property/valid-trait-ids",
    "text-property/valid-weapon-role-ids",
    "relation-property/role-total-metric",
    "text-property/default-trait-id",
    "text-property/default-main-hand",
    "text-property/default-off-hand",
    "text-property/default-weapon-role-ids",
  ],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "text-property/abbreviation", required: true, many: false },
    { pageProperty: "text-property/description", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
    {
      pageProperty: "text-property/valid-armor-weights",
      required: true,
      many: true,
      maxCount: null,
    },
    {
      pageProperty: "text-property/valid-trait-ids",
      required: true,
      many: true,
      maxCount: null,
    },
    {
      pageProperty: "text-property/valid-weapon-role-ids",
      required: true,
      many: true,
      maxCount: null,
    },
    { pageProperty: "relation-property/role-total-metric", required: false, many: false },
    { pageProperty: "text-property/default-trait-id", required: false, many: false },
    { pageProperty: "text-property/default-main-hand", required: false, many: false },
    { pageProperty: "text-property/default-off-hand", required: false, many: false },
    {
      pageProperty: "text-property/default-weapon-role-ids",
      required: false,
      many: true,
      maxCount: null,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A role stating a default trait is one a new build may be given.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A role stating its default weapons outright is taken before one naming pairings to pick from.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
