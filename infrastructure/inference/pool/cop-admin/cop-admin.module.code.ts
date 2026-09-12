import { OperationalError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import { getHost } from "akasha/infrastructure/inference/pool/inference-hosts/inference-hosts.module.code.ts"
import { TRAFFIC_COP_SERVICE_NAME } from "akasha/infrastructure/inference/pool/inference-naming/inference-naming.module.code.ts"
import {
  runSshCapture,
  type SshTarget,
} from "akasha/infrastructure/inference/pool/inference-ssh/inference-ssh.module.code.ts"
import { everyInference } from "akasha/infrastructure/services/inferences/inference-reading/inference-reading.module.code.ts"
import { codeRoot } from "akasha/pages/modules/code-root/code-root.module.code.ts"
import { z } from "zod"

export interface CopHandle {
  readonly target: SshTarget
  readonly adminPort: number
  readonly poolNames: readonly string[]
}

export function findCop(): CopHandle {
  const read = everyInference(codeRoot())
  if ("refused" in read) throw new OperationalError(read.refused)
  const running = read.services.filter((s) => s.enabled)
  const cop = running.find((s) => s.name === TRAFFIC_COP_SERVICE_NAME)
  if (cop === undefined) {
    throw new OperationalError(`no ${TRAFFIC_COP_SERVICE_NAME} service has a page of its own`)
  }
  const host = getHost(cop.host)
  const poolNames = running
    .filter((s) => s.host === cop.host && s.lifecycle === "pool")
    .map((s) => s.name)
  return {
    target: { user: host.user, host: host.address, keyPath: host.keyPath },
    adminPort: cop.port,
    poolNames,
  }
}

const ActiveSchema = z.object({ resident: z.array(z.string()).readonly() }).strict()
const ActivateSchema = z.union([
  z.object({ resident: z.array(z.string()).readonly() }).strict(),
  z.object({ error: z.string() }).strict(),
])

async function copSaid(cop: CopHandle, curl: string): Promise<string> {
  try {
    return await runSshCapture(cop.target, curl)
  } catch (err) {
    throw new OperationalError(
      `traffic cop admin not reachable on ${cop.target.host}:${cop.adminPort} — is it running? (${String(err)})`
    )
  }
}

function copRead<T>(cop: CopHandle, out: string, schema: z.ZodType<T>): T {
  try {
    return schema.parse(JSON.parse(out))
  } catch {
    throw new OperationalError(
      `traffic cop returned an unexpected response on ${cop.target.host}:${cop.adminPort}: ${out.slice(0, 200)}`
    )
  }
}

async function copCurl<T>(cop: CopHandle, curl: string, schema: z.ZodType<T>): Promise<T> {
  return copRead(cop, await copSaid(cop, curl), schema)
}

export async function copActive(cop: CopHandle): Promise<readonly string[]> {
  const parsed = await copCurl(
    cop,
    `curl -sS -m 10 http://127.0.0.1:${cop.adminPort}/active`,
    ActiveSchema
  )
  return parsed.resident
}

export function askedToActivateSaid(name: string, host: string): string {
  return (
    `the traffic cop on ${host} was asked to make ${name} resident, ` +
    "and whatever the pool held before that may already be evicted"
  )
}

export async function copActivate(
  done: string[],
  cop: CopHandle,
  name: string
): Promise<readonly string[]> {
  const body = JSON.stringify({ name })
  const curl = `curl -sS -m 300 -X POST http://127.0.0.1:${cop.adminPort}/activate -H 'content-type: application/json' -d '${body}'`
  const out = await copSaid(cop, curl)
  done.push(askedToActivateSaid(name, cop.target.host))
  const parsed = copRead(cop, out, ActivateSchema)
  if ("error" in parsed) {
    throw new OperationalError(`traffic cop: ${parsed.error}`)
  }
  return parsed.resident
}
