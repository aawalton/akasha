import type { Module } from "@akasha/code-system/module"

export const nextBossConstants = {
  id: "01a06157-8356-7a6f-9f7c-8822d3c91088",
  pageTypeSlug: "module",
  slug: "next-boss-constants",
  definition: "the spawn times, zone ids and names this tracker is fixed to",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A district boss returns fifteen minutes after dying.",
    },
    {
      invariantKind: "constraint",
      statement: "A district boss returns seven minutes after dying during an event.",
    },
    {
      invariantKind: "constraint",
      statement: "The simulacrum of Molag Bal returns five minutes after dying.",
    },
    {
      invariantKind: "constraint",
      statement: "Imperial City is two zones and the Imperial Sewers are a third.",
    },
  ],
} as const satisfies Module
