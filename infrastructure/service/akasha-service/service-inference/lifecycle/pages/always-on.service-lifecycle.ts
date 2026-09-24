import type { ServiceLifecycle } from "akasha/infrastructure/service/akasha-service/service-inference/lifecycle/service-lifecycle.page-type.types.ts"

export const alwaysOn = {
  id: "01a0ca95-009e-7647-9688-638289ca0b20",
  type: "page-type/service-lifecycle",
  slug: "always-on",
  definition: "a service that runs at all times",
} as const satisfies ServiceLifecycle
