import { OperationalError } from "akasha/code/error/errors-core/modules/exit-code/exit-code.module.code.ts"
import { firstCapture } from "akasha/code/type/narrowing/modules/first-capture/first-capture.module.code.ts"
import {
  createJob,
  readJobPodLogs,
  waitForJob,
} from "akasha/infrastructure/cluster/api/modules/cluster-jobs/cluster-jobs.module.code.ts"
import {
  buildUpscaleServingJob,
  UPSCALE_SERVING_NAMESPACE,
} from "akasha/infrastructure/inference/generation/upscale/modules/serving-job/upscale-serving-job.module.code.ts"

const JOB_WAIT_TIMEOUT_MS = 31 * 60_000
const JOB_POLL_MS = 5_000

const LANDED = /^UPSCALE_OUT_SLUG=(image-[0-9a-f]{16})$/m

interface ClusterUpscaleParams {
  readonly inSlug: string
  readonly resolution: number
  readonly seed: number
  readonly jobName: string
}

export async function runClusterUpscale(params: ClusterUpscaleParams): Promise<string> {
  const manifest = buildUpscaleServingJob({
    jobName: params.jobName,
    inSlug: params.inSlug,
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
  const logs = await readJobPodLogs(UPSCALE_SERVING_NAMESPACE, params.jobName).catch(() => "")
  if (result.outcome !== "succeeded") {
    throw new OperationalError(
      `cluster upscale Job ${params.jobName} ${result.outcome}` +
        (logs !== "" ? `\n--- pod logs (tail) ---\n${logs.slice(-2000)}` : "")
    )
  }

  const landed = firstCapture(LANDED.exec(logs))
  if (landed === null) {
    throw new OperationalError(
      `cluster upscale Job ${params.jobName} succeeded and named no image page it landed` +
        (logs !== "" ? `\n--- pod logs (tail) ---\n${logs.slice(-2000)}` : "")
    )
  }
  return landed
}
