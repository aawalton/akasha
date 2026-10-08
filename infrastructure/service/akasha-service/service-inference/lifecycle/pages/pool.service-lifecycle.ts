import type { ServiceLifecycle } from "akasha/infrastructure/service/akasha-service/service-inference/lifecycle/service-lifecycle.page-type.types.ts"

export const pool = {
  id: "01a0ca94-f14e-7f53-b7b0-2c9caf509d64",
  type: "page-type/service-lifecycle",
  slug: "pool",
  definition: "a service the pool swaps in and out",
  createdAt: "2026-09-22T19:25:53.870Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies ServiceLifecycle
