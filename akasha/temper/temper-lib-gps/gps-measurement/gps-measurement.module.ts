import type { Module } from "@akasha/code-system/module"

export const gpsMeasurement = {
  id: "01a0614d-4764-731d-9019-8c924987851d",
  pageTypeSlug: "module",
  slug: "gps-measurement",
  definition: "the scale and offset that carry one map's coordinates onto Tamriel's",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A measurement is taken once for a map and kept.",
    },
  ],
} as const satisfies Module
