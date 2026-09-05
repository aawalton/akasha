import { createJob, readJobPodLogs, waitForJob } from "@akasha/cluster-api/cluster-jobs"
import { OperationalError } from "@akasha/errors-core/exit-code"
import { makeSeaweedFSObjectStore } from "@akasha/object-store/seaweedfs-store"
import { z } from "zod"
import {
  buildUpscaleServingJob,
  UPSCALE_SERVING_BUCKET,
  UPSCALE_SERVING_NAMESPACE,
} from "../upscale-serving-job/upscale-serving-job.module.code.ts"

const JOB_WAIT_TIMEOUT_MS = 31 * 60_000
const JOB_POLL_MS = 5_000

const SeaweedEnvSchema = z.object({
  SEAWEEDFS_S3_ENDPOINT: z.string().min(1),
  SEAWEEDFS_ACCESS_KEY: z.string().min(1),
  SEAWEEDFS_SECRET_KEY: z.string().min(1),
  SEAWEEDFS_REGION: z.string().default("us-east-1"),
})

export interface ClusterUpscaleParams {
  readonly inputBytes: Uint8Array
  readonly inName: string
  readonly outName: string
  readonly resolution: number
  readonly seed: number
  readonly jobName: string
}

export async function runClusterUpscale(params: ClusterUpscaleParams): Promise<Uint8Array> {
  const parsed = SeaweedEnvSchema.safeParse(process.env)
  if (!parsed.success) {
    const missing = parsed.error.issues.map((i) => i.path.join(".")).join(", ")
    throw new OperationalError(
      `cluster upscale needs SeaweedFS creds in the environment (missing/invalid: ${missing}). ` +
        "They live in ~/.secrets.env; source it or use --host workstation."
    )
  }
  const store = makeSeaweedFSObjectStore({
    s3Endpoint: parsed.data.SEAWEEDFS_S3_ENDPOINT.replace(/\/+$/, ""),
    bucket: UPSCALE_SERVING_BUCKET,
    accessKey: parsed.data.SEAWEEDFS_ACCESS_KEY,
    secretKey: parsed.data.SEAWEEDFS_SECRET_KEY,
    region: parsed.data.SEAWEEDFS_REGION,
  })

  await store.put(`inputs/${params.inName}`, new Uint8Array(params.inputBytes))

  const manifest = buildUpscaleServingJob({
    jobName: params.jobName,
    inName: params.inName,
    outName: params.outName,
    resolution: params.resolution,
    seed: params.seed,
  })
  process.stdout.write(
    `cluster: created Job ${params.jobName} on node-06 (RTX 3080 Ti); waiting…\n`
  )
  await createJob(UPSCALE_SERVING_NAMESPACE, manifest)

  const result = await waitForJob(UPSCALE_SERVING_NAMESPACE, params.jobName, {
    timeoutMs: JOB_WAIT_TIMEOUT_MS,
    pollMs: JOB_POLL_MS,
  })
  if (result.outcome !== "succeeded") {
    const logs = await readJobPodLogs(UPSCALE_SERVING_NAMESPACE, params.jobName).catch(() => "")
    throw new OperationalError(
      `cluster upscale Job ${params.jobName} ${result.outcome}` +
        (logs !== "" ? `\n--- pod logs (tail) ---\n${logs.slice(-2000)}` : "")
    )
  }

  try {
    return await store.get(`outputs/${params.outName}`)
  } catch (err) {
    throw new OperationalError(
      `cluster upscale Job succeeded but outputs/${params.outName} is unreadable: ${String(err)}`
    )
  }
}
