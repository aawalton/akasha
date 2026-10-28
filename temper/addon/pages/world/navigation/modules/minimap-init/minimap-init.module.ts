import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const minimapInit = {
  id: "01a06269-2982-7852-8cbe-8084680d1aac",
  type: "page-type/module",
  slug: "minimap-init",
  definition: "the minimap window built out of the world map",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The keyboard minimap sits inside an empty panel that Temper's HUD layout places.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That panel is the minimap's border in size, and hidden while the minimap is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The gamepad minimap keeps the place saved for it.",
    },
  ],
  createdAt: "2026-09-02T13:57:34.210Z",
  updatedAt: "2026-10-28T00:42:14.190Z",
} as const satisfies Module
