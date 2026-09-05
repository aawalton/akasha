import type { Module } from "@akasha/code-system/module"

export const stateSpawnedSeat = {
  id: "01a06983-278f-7ddb-8d5a-076c8293a894",
  pageTypeSlug: "module",
  slug: "state-spawned-seat",
  definition: "the attributes a spawned seat is stated with",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The stating module is imported from beside this one and its function called.",
    },
    {
      invariantKind: "absence",
      statement: "No command is spawned to state a spawned seat, and no ceiling bounds one.",
    },
    {
      invariantKind: "departure",
      statement: "A mode or a principal the stating would refuse is refused before anything runs.",
    },
    {
      invariantKind: "departure",
      statement: "A stating's refusal is answered as the refusal's own words.",
    },
  ],
} as const satisfies Module
