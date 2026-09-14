import type { ProxyPort } from "akasha/agent/seat/properties/proxy-port.number-property.types.ts"
import type { ProxyProcess } from "akasha/agent/seat/properties/proxy-process.process-property.types.ts"
import type { ProxyVersion } from "akasha/agent/seat/properties/proxy-version.text-property.types.ts"

export type Proxy = {
  process: ProxyProcess
  port: ProxyPort
  version: ProxyVersion
}
