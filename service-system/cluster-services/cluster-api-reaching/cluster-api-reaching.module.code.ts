import { InputError } from "@akasha/errors-core/exit-code"
import { z } from "zod"

const TIMEOUT_MS = 30_000

interface K8sAdminConfig {
  saToken: string
  apiBase: string
  caCert: string | undefined
}

const CREDENTIAL_SCHEMA = z.string().min(1)

function requireEnv(name: string): string {
  try {
    return CREDENTIAL_SCHEMA.parse(process.env[name])
  } catch {
    throw new InputError(`env var ${name} is not set`)
  }
}

function loadConfig(): K8sAdminConfig {
  const saToken = requireEnv("PIPELINE_SA_TOKEN")
  const apiBase = requireEnv("K8S_API_BASE")
  const caCertB64 = z.string().optional().parse(process.env.K8S_CA_CERT_B64)
  const caCert = caCertB64 != null ? Buffer.from(caCertB64, "base64").toString("utf-8") : undefined

  return { saToken, apiBase, caCert }
}

async function k8sFetch(path: string, config: K8sAdminConfig): Promise<Response> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    return await fetch(`${config.apiBase}${path}`, {
      headers: {
        Authorization: `Bearer ${config.saToken}`,
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      ...(config.caCert != null ? { tls: { ca: config.caCert } } : {}),
    } satisfies BunFetchRequestInit)
  } finally {
    clearTimeout(timeoutId)
  }
}

let cachedConfig: K8sAdminConfig | null = null

function getConfig(): K8sAdminConfig {
  if (!cachedConfig) cachedConfig = loadConfig()
  return cachedConfig
}

export async function apiFetch(path: string): Promise<Response> {
  return k8sFetch(path, getConfig())
}

export async function proxyFetch(
  namespace: string,
  service: string,
  port: number,
  path: string
): Promise<Response> {
  return k8sFetch(
    `/api/v1/namespaces/${namespace}/services/${service}:${port}/proxy${path}`,
    getConfig()
  )
}
