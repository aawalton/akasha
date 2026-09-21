import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const actionButtonProperty = {
  id: "01a0a038-58f8-77ef-9a9c-55d8f5e3d9ad",
  type: "page-type/page-type",
  slug: "action-button-property",
  definition: "a page property drawn as a button running a verb over the page",
  extends: ["page-type/page-property"],
  parts: ["text-property/action-button-verb"],
  properties: [{ pageProperty: "text-property/action-button-verb", required: true, many: false }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The value of such a property is the button rather than anything the page holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which verb the button runs is stated on the property rather than by a browser.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Such a button is drawn in the accent, being a call to act rather than a value.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  shapes: "jsonl",
} as const satisfies PageType
