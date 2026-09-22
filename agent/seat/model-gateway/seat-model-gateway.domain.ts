import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const seatModelGateway = {
  id: "01a08866-3c3f-734b-a28f-34e79b39e012",
  type: "page-type/domain",
  slug: "seat-model-gateway",
  definition: "a seat's client proxy to Anthropic",
  parts: [
    "module/seat-gateway-state",
    "module/supervisor-gateway-adoption-decide",
    "module/supervisor-gateway-adoption-rule",
    "module/supervisor-gateway-liveness",
    "module/supervisor-gateway-liveness-decide",
    "module/supervisor-gateway-liveness-rule",
    "module/supervisor-gateway-ownership",
    "module/supervisor-gateway-port-line",
    "module/supervisor-gateway-version",
    "module/supervisor-spawn-gateway",
  ],
} as const satisfies Domain
