import { shape } from "@akasha/utils-narrow/shape"
import {
  CI_NAMESPACE,
  CLUSTER_CEILING_MS,
  clusterFetch,
  proxyPath,
  STEP_PROCESS,
} from "../ci-reaper-cluster/ci-reaper-cluster.module.code.ts"

const PROMETHEUS_NAMESPACE = "prometheus"

const PROMETHEUS_SERVICE = "prometheus"

const PROMETHEUS_PORT = 9090

const InstantVectorShape = shape.looseObject({
  status: shape.literal("success"),
  data: shape.looseObject({
    result: shape.array(
      shape.looseObject({ value: shape.tuple([shape.number(), shape.string()]) })
    ),
  }),
})

export function cpuRateQuery(containerName: string, windowMs: number): string {
  const windowSeconds = Math.max(1, Math.round(windowMs / 1000))
  return (
    `rate(container_cpu_usage_seconds_total{namespace="${CI_NAMESPACE}",` +
    `container="${STEP_PROCESS}",pod="${containerName}"}[${windowSeconds}s])`
  )
}

export async function containerCpuRateCores(
  containerName: string,
  windowMs: number
): Promise<number | null> {
  const query = new URLSearchParams({ query: cpuRateQuery(containerName, windowMs) })
  const waitingFor = `asking prometheus for the cpu rate of container ${containerName}`
  const res = await clusterFetch(
    proxyPath(
      PROMETHEUS_NAMESPACE,
      PROMETHEUS_SERVICE,
      PROMETHEUS_PORT,
      `/api/v1/query?${query.toString()}`
    ),
    waitingFor,
    CLUSTER_CEILING_MS
  )
  if (!res.ok) throw new Error(`${waitingFor} answered HTTP ${res.status}`)
  const parsed = InstantVectorShape.parse(await res.json())
  const first = parsed.data.result[0]
  if (first === undefined) return null
  const rate = Number.parseFloat(first.value[1])
  return Number.isFinite(rate) ? rate : null
}
