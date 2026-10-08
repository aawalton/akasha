import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useViewConfigHandlers = {
  id: "01a05cba-9cbc-7530-9776-64407deb6bbc",
  type: "page-type/module",
  slug: "use-view-config-handlers",
  definition: "what a view calls when its config changes",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A change made on a view keeps the related narrows the view states and never shows.",
    },
  ],
  createdAt: "2026-09-01T11:28:48.828Z",
  updatedAt: "2026-09-28T22:40:15.000Z",
} as const satisfies Module
