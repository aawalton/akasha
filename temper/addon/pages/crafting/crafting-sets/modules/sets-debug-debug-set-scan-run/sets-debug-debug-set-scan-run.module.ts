import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsDebugDebugSetScanRun = {
  id: "01a0623c-2df7-774b-b28f-3e28f57b8014",
  type: "page-type/module",
  slug: "sets-debug-debug-set-scan-run",
  definition: "the timed march through item id packages that a full set scan is made of",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each package of item ids is scheduled one second after the package before that package.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The march stops early once a package finds no further items.",
    },
  ],
} as const satisfies Module
