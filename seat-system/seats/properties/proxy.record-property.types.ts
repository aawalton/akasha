import type { ProxyPort } from "akasha/seat-system/seats/properties/proxy-port.number-property.types.ts"
import type { ProxyProcess } from "akasha/seat-system/seats/properties/proxy-process.process-property.types.ts"
import type { ProxyVersion } from "akasha/seat-system/seats/properties/proxy-version.text-property.types.ts"

export type Proxy = {
  process: ProxyProcess
  port: ProxyPort
  version: ProxyVersion
}
