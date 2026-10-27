import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const coreConfig = {
  id: "01a17ec9-978f-78d9-bd34-f4296ef9b239",
  type: "page-type/module",
  slug: "core-config",
  definition: "the HUD layout the watcher left for Temper's core add-on",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A config stating no version above zero states no layout.",
    },
  ],
  createdAt: "2026-10-27T19:15:03.182Z",
  updatedAt: "2026-10-27T19:15:03.182Z",
} as const satisfies Module
