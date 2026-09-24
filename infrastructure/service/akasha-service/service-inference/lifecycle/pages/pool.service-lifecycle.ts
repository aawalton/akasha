import type { ServiceLifecycle } from "akasha/infrastructure/service/akasha-service/service-inference/lifecycle/service-lifecycle.page-type.types.ts"

export const pool = {
  id: "01a0ca94-f14e-7f53-b7b0-2c9caf509d64",
  type: "page-type/service-lifecycle",
  slug: "pool",
  definition: "a service the pool swaps in and out",
} as const satisfies ServiceLifecycle
