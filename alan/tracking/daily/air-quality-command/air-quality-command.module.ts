import type { Module } from "@akasha/code-system/module"

export const airQualityCommand = {
  id: "01a069c8-ad1b-7fa8-808f-f69aa4af63b0",
  pageTypeSlug: "module",
  slug: "air-quality-command",
  definition: "the air outside said as a verdict on exerting oneself in it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This module is run as its own program by the name its ops-command page states.",
    },
  ],
} as const satisfies Module
