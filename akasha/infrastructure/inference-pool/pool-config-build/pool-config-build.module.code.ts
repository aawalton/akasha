import { hashFiles } from "@akasha/workflow-language/inputs-hash"
import { launchdLabel, serviceDir } from "../inference-naming/inference-naming.module.code.ts"
import type {
  InferenceHost,
  InferenceService,
} from "../inference-schema/inference-schema.module.code.ts"
import type { PoolConfig } from "../pool-config/pool-config.module.code.ts"

const encoder = new TextEncoder()

export function buildPoolConfig(
  services: readonly InferenceService[],
  adminPort: number
): PoolConfig {
  const poolServices = services.filter((s) => s.lifecycle === "pool")
  return {
    adminPort,
    warmSet: poolServices.filter((s) => s.warm).map((s) => s.name),
    services: poolServices.map((s) => {
      if (s.internalPort === undefined) {
        throw new Error(`pool service ${s.name} is missing internalPort`)
      }
      return {
        name: s.name,
        publicPort: s.port,
        publicHost: s.publicBind === "loopback" ? "127.0.0.1" : "0.0.0.0",
        internalPort: s.internalPort,
        launchdLabel: launchdLabel(s.name),
      }
    }),
  }
}

export function serializePoolConfig(config: PoolConfig): string {
  return JSON.stringify(config, null, 2)
}

export function foldPoolConfigHash(baseHash: string, poolJson: string) {
  return hashFiles([
    { path: " files-hash", bytes: encoder.encode(baseHash) },
    { path: " pool-config", bytes: encoder.encode(poolJson) },
  ])
}

export function buildWritePoolConfigScript(args: {
  host: InferenceHost
  services: readonly InferenceService[]
  copName: string
  adminPort: number
}): string {
  const { host, services, copName, adminPort } = args
  const dir = serviceDir(host.home, copName)
  const json = serializePoolConfig(buildPoolConfig(services, adminPort))
  return [
    "set -euo pipefail",
    `mkdir -p '${dir}'`,
    `cat > '${dir}/pool.json' <<'POOLJSON_EOF'`,
    json,
    "POOLJSON_EOF",
    "",
  ].join("\n")
}
