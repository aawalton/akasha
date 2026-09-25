import { InputError } from "akasha/code/error/errors-core/modules/exit-code/exit-code.module.code.ts"
import { z } from "zod"

const TIMEOUT_MS = 30_000

interface ClusterCredentials {
  readonly saToken: string
  readonly apiBase: string
  readonly caCert: string | undefined
}

const CREDENTIAL_SCHEMA = z.string().min(1)

function requireEnv(name: string): string {
  try {
    return CREDENTIAL_SCHEMA.parse(process.env[name])
  } catch {
    throw new InputError(`env var ${name} is not set`)
  }
}

function optionalEnv(name: string): string | undefined {
  const held = CREDENTIAL_SCHEMA.safeParse(process.env[name])
  return held.success ? held.data : undefined
}

function loadCredentials(): ClusterCredentials {
  const saToken = requireEnv("PIPELINE_SA_TOKEN")
  const apiBase = requireEnv("K8S_API_BASE").replace(/\/+$/, "")
  const caCertB64 = optionalEnv("K8S_CA_CERT_B64")
  const caCert =
    caCertB64 === undefined ? undefined : Buffer.from(caCertB64, "base64").toString("utf-8")

  return { saToken, apiBase, caCert }
}

async function k8sFetch(path: string, credentials: ClusterCredentials): Promise<Response> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    return await fetch(`${credentials.apiBase}${path}`, {
      headers: {
        Authorization: `Bearer ${credentials.saToken}`,
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      ...(credentials.caCert === undefined ? {} : { tls: { ca: credentials.caCert } }),
    } satisfies BunFetchRequestInit)
  } finally {
    clearTimeout(timeoutId)
  }
}

let held: ClusterCredentials | null = null

export function clusterCredentials(): ClusterCredentials {
  if (held === null) held = loadCredentials()
  return held
}

export async function proxyFetch(
  namespace: string,
  service: string,
  port: number,
  path: string
): Promise<Response> {
  return k8sFetch(
    `/api/v1/namespaces/${namespace}/services/${service}:${port}/proxy${path}`,
    clusterCredentials()
  )
}
