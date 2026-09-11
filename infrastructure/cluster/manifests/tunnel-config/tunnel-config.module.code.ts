import { readFileSync } from "node:fs"
import { join } from "node:path"
import { discoverTunnelRoutes } from "akasha/infrastructure/cluster/manifests/tunnel-route-discovery/tunnel-route-discovery.module.code.ts"

const HEADER_PATH = join(
  import.meta.dirname,
  "../../../../services/clusters/pages/cloudflared/cloudflared.service-cluster.config.yaml"
)

const CONFIG_KEY = "config.yaml"
const INGRESS = "ingress:"
const CATCH_ALL = "  - service: http_status:404"

export async function tunnelConfigData(): Promise<Record<string, string>> {
  const sourced = await discoverTunnelRoutes()
  const sorted = [...sourced].sort((one, other) =>
    one.route.hostname.localeCompare(other.route.hostname)
  )
  const routed = sorted.map(
    (one) => "  - hostname: " + one.route.hostname + "\n    service: " + one.route.service
  )
  const header = readFileSync(HEADER_PATH, "utf8").trimEnd()
  return { [CONFIG_KEY]: [header, INGRESS, ...routed, CATCH_ALL, ""].join("\n") }
}
