import { OperationalError } from "@akasha/errors-core/exit-code"
import { z } from "zod"
import { getHost } from "../inference-hosts/inference-hosts.module.code.ts"
import { TRAFFIC_COP_SERVICE_NAME } from "../inference-naming/inference-naming.module.code.ts"
import { SERVICES } from "../inference-services/inference-services.module.code.ts"
import { runSshCapture, type SshTarget } from "../inference-ssh/inference-ssh.module.code.ts"

export interface CopHandle {
  readonly target: SshTarget
  readonly adminPort: number
  readonly poolNames: readonly string[]
}

export function findCop(): CopHandle {
  const cop = SERVICES.find((s) => s.name === TRAFFIC_COP_SERVICE_NAME)
  if (cop === undefined) {
    throw new OperationalError(`no ${TRAFFIC_COP_SERVICE_NAME} service is declared in the registry`)
  }
  const host = getHost(cop.host)
  const poolNames = SERVICES.filter((s) => s.host === cop.host && s.lifecycle === "pool").map(
    (s) => s.name
  )
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

async function copCurl<T>(cop: CopHandle, curl: string, schema: z.ZodType<T>): Promise<T> {
  let out: string
  try {
    out = await runSshCapture(cop.target, curl)
  } catch (err) {
    throw new OperationalError(
      `traffic cop admin not reachable on ${cop.target.host}:${cop.adminPort} — is it running? (${String(err)})`
    )
  }
  try {
    return schema.parse(JSON.parse(out))
  } catch {
    throw new OperationalError(
      `traffic cop returned an unexpected response on ${cop.target.host}:${cop.adminPort}: ${out.slice(0, 200)}`
    )
  }
}

export async function copActive(cop: CopHandle): Promise<readonly string[]> {
  const parsed = await copCurl(
    cop,
    `curl -sS -m 10 http://127.0.0.1:${cop.adminPort}/active`,
    ActiveSchema
  )
  return parsed.resident
}

export async function copActivate(cop: CopHandle, name: string): Promise<readonly string[]> {
  const body = JSON.stringify({ name })
  const curl = `curl -sS -m 300 -X POST http://127.0.0.1:${cop.adminPort}/activate -H 'content-type: application/json' -d '${body}'`
  const parsed = await copCurl(cop, curl, ActivateSchema)
  if ("error" in parsed) {
    throw new OperationalError(`traffic cop: ${parsed.error}`)
  }
  return parsed.resident
}
