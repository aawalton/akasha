import type { ComputedPropertyModule } from "akasha/pages/computed-property-modules/computed-property-module.page-type.types.ts"

export const fiveHourReset = {
  id: "01a0916a-a294-7b0a-83ad-fbfc47ae5bb7",
  type: "computed-property-module",
  slug: "five-hour-reset",
  definition: "when a five-hour allowance comes back, a spent seven-day window holding it back",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An account that has spent its seven-day window has no five-hour reset.",
    },
    {
      invariantKind: "departure",
      statement: "An account that has spent its five-hour window has that window's own reset.",
    },
    {
      invariantKind: "departure",
      statement: "An account stating no five-hour reset has no five-hour reset.",
    },
    {
      invariantKind: "departure",
      statement: "A seven-day window nothing has been read of holds no reset back.",
    },
  ],
} as const satisfies ComputedPropertyModule
