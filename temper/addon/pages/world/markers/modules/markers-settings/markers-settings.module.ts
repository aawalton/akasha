import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const markersSettings = {
  id: "01a0de85-2b4c-79b7-8aed-e4003fe9acd5",
  type: "page-type/module",
  slug: "markers-settings",
  definition: "the settings panel and the choices kept between sessions",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A section of the panel is a header widget, and no label carries a color code.",
    },
  ],
  createdAt: "2026-09-26T16:21:04.460Z",
  updatedAt: "2026-10-18T19:51:52.816Z",
} as const satisfies Module
