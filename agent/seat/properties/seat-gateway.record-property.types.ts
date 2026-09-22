import type { GatewayPort } from "akasha/agent/seat/properties/gateway-port.number-property.types.ts"
import type { GatewayProcess } from "akasha/agent/seat/properties/gateway-process.process-property.types.ts"
import type { GatewayVersion } from "akasha/agent/seat/properties/gateway-version.text-property.types.ts"

export type SeatGateway = {
  process: GatewayProcess
  port: GatewayPort
  version: GatewayVersion
}
