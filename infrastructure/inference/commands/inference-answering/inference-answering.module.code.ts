import { OperationalError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import { getHost } from "akasha/infrastructure/inference/pool/inference-hosts/inference-hosts.module.code.ts"
import type { InferenceHost } from "akasha/infrastructure/inference/pool/inference-schema/inference-schema.module.code.ts"
import {
  type Inference,
  readFor,
} from "akasha/infrastructure/services/inferences/inference-reading/inference-reading.module.code.ts"
import { codeRoot } from "akasha/pages/modules/code-root/code-root.module.code.ts"

export function boundTo(command: readonly string[], flag: string): string | undefined {
  const at = command.indexOf(flag)
  return at >= 0 ? command[at + 1] : undefined
}

export type Reached = {
  readonly service: Inference
  readonly host: InferenceHost
  readonly baseUrl: string
}

export function serviceNamed(name: string): Reached {
  const read = readFor(codeRoot(), name)
  if ("refused" in read) throw new OperationalError(read.refused)
  const service = read.services[0] as Inference
  const host = getHost(service.host)
  return { service, host, baseUrl: `http://${host.address}:${service.port}` }
}

export function targetOf(host: InferenceHost): {
  readonly user: string
  readonly host: string
  readonly keyPath: string
} {
  return { user: host.user, host: host.address, keyPath: host.keyPath }
}

export function wroteTo(path: string, bytes: Uint8Array, what: string): string {
  return `wrote ${bytes.byteLength} bytes (${what}) to ${path}`
}
