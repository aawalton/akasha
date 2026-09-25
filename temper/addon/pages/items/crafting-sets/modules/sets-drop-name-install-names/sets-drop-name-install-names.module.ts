import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsDropNameInstallNames = {
  id: "01a061d6-3e2c-7086-af34-b1aa34b67fc9",
  type: "page-type/module",
  slug: "sets-drop-name-install-names",
  definition:
    "the eight drop mechanic name tables placed on the library under their language codes",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The tables are written onto the library table rather than exported.",
    },
  ],
} as const satisfies Module
