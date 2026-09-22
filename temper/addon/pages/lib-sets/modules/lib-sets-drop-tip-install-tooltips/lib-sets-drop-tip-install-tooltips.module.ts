import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const libSetsDropTipInstallTooltips = {
  id: "01a061d6-3e42-767a-88d0-cffa37314909",
  type: "page-type/module",
  slug: "lib-sets-drop-tip-install-tooltips",
  definition:
    "the eight drop mechanic tooltip tables placed on the library under their language codes",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The tables are written onto the library table rather than exported.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "An empty branch sits where the newer API version's entries would go.",
    },
  ],
} as const satisfies Module
