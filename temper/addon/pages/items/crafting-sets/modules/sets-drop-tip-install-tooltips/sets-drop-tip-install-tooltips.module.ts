import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsDropTipInstallTooltips = {
  id: "01a061d6-3e42-767a-88d0-cffa37314909",
  type: "page-type/module",
  slug: "sets-drop-tip-install-tooltips",
  definition:
    "the eight drop mechanic tooltip tables placed on the library under their language codes",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The tables are written onto the library table rather than exported.",
    },
  ],
  createdAt: "2026-09-02T11:17:05.730Z",
  updatedAt: "2026-09-25T13:10:06.000Z",
} as const satisfies Module
