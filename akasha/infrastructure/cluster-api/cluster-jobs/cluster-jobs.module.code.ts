import { z } from "zod"
import { getConfig, k8sFetch, refuse } from "../cluster-api-fetch/cluster-api-fetch.module.code.ts"
import { listPods } from "../cluster-workloads/cluster-workloads.module.code.ts"

const JobCreateResponseSchema = z
  .object({
    metadata: z
      .object({
        name: z.string(),
      })
      .passthrough(),
  })
  .passthrough()

export async function createJob(
  namespace: string,
  manifest: unknown
): Promise<{ readonly name: string }> {
  const response = await k8sFetch(
    `/apis/batch/v1/namespaces/${namespace}/jobs`,
    { method: "POST", body: JSON.stringify(manifest) },
    getConfig()
  )
  if (!response.ok) await refuse("createJob", response)
  const body = JobCreateResponseSchema.parse(await response.json())
  return { name: body.metadata.name }
}

const JobStatusResponseSchema = z
  .object({
    status: z
      .object({
        active: z.number().optional(),
        succeeded: z.number().optional(),
        failed: z.number().optional(),
        conditions: z
          .array(
            z
              .object({
                type: z.string(),
                status: z.string(),
              })
              .passthrough()
          )
          .optional(),
      })
      .passthrough()
      .optional(),
  })
  .passthrough()

export interface JobCondition {
  readonly type: string
  readonly status: string
}

export interface JobStatus {
  readonly active: number
  readonly succeeded: number
  readonly failed: number
  readonly conditions: readonly JobCondition[]
}

export async function getJob(namespace: string, name: string): Promise<JobStatus> {
  const response = await k8sFetch(
    `/apis/batch/v1/namespaces/${namespace}/jobs/${name}`,
    { method: "GET" },
    getConfig()
  )
  if (!response.ok) await refuse("getJob", response)
  const body = JobStatusResponseSchema.parse(await response.json())
  const status = body.status
  return {
    active: status?.active ?? 0,
    succeeded: status?.succeeded ?? 0,
    failed: status?.failed ?? 0,
    conditions: (status?.conditions ?? []).map((c) => ({ type: c.type, status: c.status })),
  }
}

export const JOB_POLL_MS = 5_000

export type JobOutcome = "succeeded" | "failed" | "timeout"

export async function waitForJob(
  namespace: string,
  name: string,
  opts: { readonly timeoutMs: number; readonly pollMs?: number }
): Promise<{ readonly outcome: JobOutcome }> {
  const pollMs = opts.pollMs ?? JOB_POLL_MS
  const deadline = Date.now() + opts.timeoutMs
  while (Date.now() < deadline) {
    const status = await getJob(namespace, name)
    const complete = status.conditions.some((c) => c.type === "Complete" && c.status === "True")
    if (status.succeeded >= 1 || complete) return { outcome: "succeeded" }
    const failed = status.conditions.some((c) => c.type === "Failed" && c.status === "True")
    if (status.failed >= 1 || failed) return { outcome: "failed" }
    await new Promise((resolve) => setTimeout(resolve, pollMs))
  }
  return { outcome: "timeout" }
}

export async function readJobPodLogs(namespace: string, jobName: string): Promise<string> {
  const pods = await listPods(namespace, `job-name=${jobName}`)
  const pod = pods.at(0)
  if (pod === undefined) return ""
  const response = await k8sFetch(
    `/api/v1/namespaces/${namespace}/pods/${pod.name}/log`,
    { method: "GET" },
    getConfig()
  )
  if (!response.ok) await refuse("readJobPodLogs", response)
  return await response.text()
}

const EventListSchema = z
  .object({
    items: z.array(
      z
        .object({
          reason: z.string().optional(),
          lastTimestamp: z.string().nullish(),
          eventTime: z.string().nullish(),
          reportingInstance: z.string().optional(),
          source: z.object({ host: z.string().optional() }).passthrough().optional(),
        })
        .passthrough()
    ),
  })
  .passthrough()

export async function countOutOfCpuEvents(node: string, sinceMs: number): Promise<number> {
  const response = await k8sFetch(
    "/api/v1/events?fieldSelector=reason=OutOfcpu",
    { method: "GET" },
    getConfig()
  )
  if (!response.ok) await refuse("countOutOfCpuEvents", response)
  const body = EventListSchema.parse(await response.json())
  return body.items.filter((e) => {
    const host = e.source?.host ?? e.reportingInstance ?? ""
    if (host !== node) return false
    const at = e.lastTimestamp ?? e.eventTime
    if (at === null || at === undefined || at === "") return true
    return Date.parse(at) >= sinceMs
  }).length
}
