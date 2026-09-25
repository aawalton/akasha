import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorGatewayLiveness = {
  id: "01a0687c-042b-7000-8bbe-73cc8f950dec",
  type: "page-type/module",
  slug: "supervisor-gateway-liveness",
  definition: "how a supervisor watches the health of the model gateway",
  code: "ts",
} as const satisfies Module
