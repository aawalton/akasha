import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const bearerOfMyVengeance = {
  id: "01a0655a-7b7a-7210-a80a-b7962e5e9e30",
  type: "page-type/world-condition",
  slug: "bearer-of-my-vengeance",
  title: "Bearer of My Vengeance",
  world: "world/the-wandering-inn",
} as const satisfies WorldCondition
