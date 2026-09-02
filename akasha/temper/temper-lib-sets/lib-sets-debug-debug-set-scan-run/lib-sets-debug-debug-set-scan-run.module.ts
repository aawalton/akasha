import type { Module } from "@akasha/code-system/module"

export const libSetsDebugDebugSetScanRun = {
  id: "01a0623c-2df7-774b-b28f-3e28f57b8014",
  pageTypeSlug: "module",
  slug: "lib-sets-debug-debug-set-scan-run",
  definition: "the timed march through item id packages that a full set scan is made of",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each package of item ids is scheduled one second after the one before it.",
    },
    {
      invariantKind: "constraint",
      statement: "The march stops early once a package finds no further items.",
    },
  ],
} as const satisfies Module
