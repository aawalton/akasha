import type { Module } from "@akasha/code-system/module"

export const gpsApi = {
  id: "01a0614d-475f-7750-9fee-976d2964bf0f",
  pageTypeSlug: "module",
  slug: "gps-api",
  definition: "the coordinate functions the library object carries",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Reaching a function before the library is initialized is an error.",
    },
  ],
} as const satisfies Module
