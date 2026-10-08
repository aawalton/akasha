import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const markersEntry = {
  id: "01a0de85-2b4b-731b-813c-afda82fff0f4",
  type: "page-type/module",
  slug: "markers-entry",
  definition: "what starts the markers once the add-on has loaded",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A key binding keeps the name More Markers bound it under.",
    },
  ],
  createdAt: "2026-09-26T16:21:04.459Z",
  updatedAt: "2026-09-26T16:21:52.000Z",
} as const satisfies Module
