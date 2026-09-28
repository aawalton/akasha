import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveContractOfService = {
  id: "01a0e9f1-cfc2-707b-953f-607bf919874a",
  type: "page-type/world-mechanic",
  slug: "super-supportive-contract-of-service",
  title: "Contract of Service",
  world: "world/super-supportive",
  description:
    "An offer of great power, future opportunity and significant freedom in exchange for service.",
} as const satisfies WorldMechanic
