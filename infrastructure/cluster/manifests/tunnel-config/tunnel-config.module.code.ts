import { readFileSync } from "node:fs"
import { join } from "node:path"
import { discoverTunnelRoutes } from "akasha/infrastructure/cluster/manifests/tunnel-route-discovery/tunnel-route-discovery.module.code.ts"
import { akashaRoot } from "akasha/pages/checkout-roots/checkout-roots.module.code.ts"
import { fileOf } from "akasha/pages/indexes/property-file/property-file.module.code.ts"
import { valuedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"

const CLUSTER = "service-cluster"
const CLOUDFLARED = "cloudflared"
const CONFIG = "config"

const CONFIG_KEY = "config.yaml"
const INGRESS = "ingress:"
const CATCH_ALL = "  - service: http_status:404"

function headerIn(): string {
  const root = akashaRoot()
  const page = valuedAt(root, CLUSTER, CLOUDFLARED)
  const at = fileOf(root, page, CLUSTER, CONFIG)
  return readFileSync(join(root, at), "utf8").trimEnd()
}

export async function tunnelConfigData(): Promise<Record<string, string>> {
  const sourced = await discoverTunnelRoutes()
  const sorted = [...sourced].sort((one, other) =>
    one.route.hostname.localeCompare(other.route.hostname)
  )
  const routed = sorted.map(
    (one) => "  - hostname: " + one.route.hostname + "\n    service: " + one.route.service
  )
  const header = headerIn()
  return { [CONFIG_KEY]: [header, INGRESS, ...routed, CATCH_ALL, ""].join("\n") }
}
