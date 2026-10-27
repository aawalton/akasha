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
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel measured by another control names that control in `measuredBy`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A panel names the input modes it is placed in, keyboard or gamepad, in `inputModes`.",
    },
  ],
  createdAt: "2026-10-27T19:15:03.182Z",
  updatedAt: "2026-10-27T20:20:59.888Z",
} as const satisfies Module
