import type { Module } from "@akasha/code-system/module"

export const gpsWorldSize = {
  id: "01a0614d-4766-7a5a-b36b-152682f53e3d",
  pageTypeSlug: "module",
  slug: "gps-world-size",
  definition: "how far across a map reaches in the world's own units",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A world size is written to a string and read back from that string.",
    },
  ],
} as const satisfies Module
