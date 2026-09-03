import { z } from "zod"

export const K8S_FETCH_CEILING_MS = 30_000

export interface K8sAdminConfig {
  readonly saToken: string
  readonly apiBase: string
  readonly caCert: string | undefined
}

const ENV_VALUE = z.string().min(1)

function stated(name: string): string {
  const held = ENV_VALUE.safeParse(process.env[name])
  if (!held.success) {
    throw new Error(
      `k8sFetch: \`${name}\` is unset, so there is no cluster to reach and no credential to reach it with`
    )
  }
  return held.data
}

function loadConfig(): K8sAdminConfig {
  const caCertB64 = z.string().optional().parse(process.env.K8S_CA_CERT_B64)
  return {
    saToken: stated("PIPELINE_SA_TOKEN"),
    apiBase: stated("K8S_API_BASE"),
    caCert:
      caCertB64 === undefined ? undefined : Buffer.from(caCertB64, "base64").toString("utf-8"),
  }
}

let cachedConfig: K8sAdminConfig | null = null

export function getConfig(): K8sAdminConfig {
  if (cachedConfig === null) cachedConfig = loadConfig()
  return cachedConfig
}

export function forgetConfig(): undefined {
  cachedConfig = null
}

export type FetchLike = (...args: Parameters<typeof fetch>) => ReturnType<typeof fetch>

let fetchForTests: FetchLike | null = null

export function setFetchForTests(impl: FetchLike | null): undefined {
  fetchForTests = impl
}

export interface K8sFetchInit {
  readonly method: "GET" | "POST" | "DELETE" | "PATCH"
  readonly body?: string
  readonly contentType?: string
}

export async function k8sFetch(
  path: string,
  init: K8sFetchInit,
  config: K8sAdminConfig
): Promise<Response> {
  const controller = new AbortController()
  const ceiling = setTimeout(() => {
    controller.abort(
      new Error(`k8sFetch: ${init.method} ${path} gave no answer within ${K8S_FETCH_CEILING_MS}ms`)
    )
  }, K8S_FETCH_CEILING_MS)
  const fetchImpl: FetchLike = fetchForTests ?? fetch
  try {
    return await fetchImpl(`${config.apiBase}${path}`, {
      method: init.method,
      ...(init.body === undefined ? {} : { body: init.body }),
      headers: {
        Authorization: `Bearer ${config.saToken}`,
        "Content-Type": init.contentType ?? "application/json",
      },
      signal: controller.signal,
      ...(config.caCert === undefined ? {} : { tls: { ca: config.caCert } }),
    } satisfies BunFetchRequestInit)
  } finally {
    clearTimeout(ceiling)
  }
}

export async function detailOf(response: Response): Promise<string> {
  const text = await response.text().catch(() => "")
  return text === "" ? "" : `: ${text}`
}

export async function refuse(what: string, response: Response): Promise<never> {
  throw new Error(
    `${what} failed: HTTP ${response.status} ${response.statusText}${await detailOf(response)}`
  )
}
