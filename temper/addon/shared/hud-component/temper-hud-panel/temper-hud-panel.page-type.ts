import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperHudPanel = {
  id: "01a17ec6-0e98-7b7c-9c17-c1fa75e3b289",
  type: "page-type/page-type",
  slug: "temper-hud-panel",
  definition: "a part of the HUD placed against a dock",
  extends: ["page-type/temper-thing"],
  parts: [
    "relation-property/panel-dock",
    "boolean-property/never-moves",
    "text-property/measured-by",
  ],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "relation-property/panel-dock", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
    { pageProperty: "boolean-property/never-moves", required: false, many: false },
    { pageProperty: "text-property/measured-by", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel's key is the global name of the control the panel places.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A panel's display order is its place in its dock, counted out from the dock's edge.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel stating nothing of whether it moves is a panel that moves.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-10-27T19:11:11.511Z",
  updatedAt: "2026-10-27T19:38:16.195Z",
} as const satisfies PageType
