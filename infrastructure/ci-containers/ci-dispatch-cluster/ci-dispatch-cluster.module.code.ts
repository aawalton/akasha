import { getConfig, k8sFetch } from "@akasha/cluster-api/cluster-api-fetch"

export const CI_NAMESPACE = "ci"

export const CALL_CEILING_MS = 30_000

export interface ClusterAnswer {
  readonly status: number
  readonly body: unknown
}

export interface Cluster {
  readonly get: (path: string) => Promise<ClusterAnswer>
  readonly post: (path: string, body: unknown) => Promise<ClusterAnswer>
  readonly remove: (path: string) => Promise<ClusterAnswer>
}

async function bounded<T>(what: string, act: () => Promise<T>): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined
  const ceiling = new Promise<never>((_resolve, reject) => {
    timer = setTimeout(
      () =>
        reject(
          new Error(
            `the cluster did not answer ${what} inside ${CALL_CEILING_MS}ms, which is how long this waited for it`
          )
        ),
      CALL_CEILING_MS
    )
  })
  try {
    return await Promise.race([act(), ceiling])
  } finally {
    if (timer !== undefined) clearTimeout(timer)
  }
}

function parsed(text: string): unknown {
  if (text === "") return null
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

export async function openCluster(): Promise<Cluster> {
  const config = getConfig()
  const call = async (
    method: "GET" | "POST" | "DELETE",
    path: string,
    body?: unknown
  ): Promise<ClusterAnswer> => {
    const answer = await bounded(`${method} ${path}`, () =>
      k8sFetch(
        path,
        { method, ...(body === undefined ? {} : { body: JSON.stringify(body) }) },
        config
      )
    )
    return { status: answer.status, body: parsed(await answer.text()) }
  }
  return {
    get: (path) => call("GET", path),
    post: (path, body) => call("POST", path, body),
    remove: (path) => call("DELETE", path),
  }
}

export function containersPath(): string {
  return `/api/v1/namespaces/${CI_NAMESPACE}/pods`
}

export function containerPath(name: string): string {
  return `${containersPath()}/${name}`
}

export function selected(path: string, selector: Readonly<Record<string, string>>): string {
  const params = new URLSearchParams(selector)
  return `${path}?${params.toString()}`
}

export function refusal(what: string, answer: ClusterAnswer): Error {
  const said = typeof answer.body === "string" ? answer.body : JSON.stringify(answer.body)
  return new Error(`the cluster refused ${what} with HTTP ${answer.status}: ${said}`)
}

const PERSISTENT_STATUSES: ReadonlySet<number> = new Set([400, 401, 403, 404, 405, 422])

export function classOf(status: number | null): "persistent" | "transient" {
  if (status === null) return "transient"
  return PERSISTENT_STATUSES.has(status) ? "persistent" : "transient"
}
