import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperHudDock = {
  id: "01a17ec5-26a5-7132-972f-0035beb6be88",
  type: "page-type/page-type",
  slug: "temper-hud-dock",
  definition: "a side or corner of the screen the HUD's panels stack against",
  extends: ["page-type/temper-thing"],
  parts: ["number-property/dock-gap"],
  properties: [{ pageProperty: "number-property/dock-gap", required: true, many: false }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A dock's slug is the side or corner it names, such as `top-left`.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-10-27T19:10:12.131Z",
  updatedAt: "2026-10-27T19:10:12.131Z",
} as const satisfies PageType
