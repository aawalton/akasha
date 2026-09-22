import { gpuVramUsableMinSelector } from "akasha/infrastructure/cluster/k8s-type/modules/hostnames/hostnames.module.code.ts"
import { refOf } from "akasha/infrastructure/container-image/modules/image-ref/image-ref.module.code.ts"
import { upscaleClusterImage } from "akasha/infrastructure/inference/generation/upscale/cluster-image/upscale-cluster-image.container-recipe.ts"
import { JOB_NAMESPACE } from "akasha/infrastructure/job/modules/cluster-running/cluster-running.module.code.ts"
import { ORIGIN_ENV } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"

export const UPSCALE_SERVING_NAMESPACE = JOB_NAMESPACE

const PAGES_ORIGIN = "http://page-forwarder.page-forwarder.svc.cluster.local:8787"

const GPU_VRAM_TIER = "8gi" as const

const UPSCALE_WEIGHT_CACHE_HOSTPATH = "/var/lib/upscale-weights"
const UPSCALE_WEIGHT_CACHE_MOUNT = "/app/ComfyUI/models/SEEDVR2"

const TTL_SECONDS_AFTER_FINISHED = 3600
const ACTIVE_DEADLINE_SECONDS = 1800
const DEFAULT_BLOCKS_TO_SWAP = 24

const UPSCALE_JOB_MEMORY = "16Gi"

interface SecretKeyRef {
  readonly secretKeyRef: { readonly name: string; readonly key: string }
}
interface EnvVar {
  readonly name: string
  readonly value?: string
  readonly valueFrom?: SecretKeyRef
}

export interface UpscaleServingJobParams {
  readonly jobName: string
  readonly inSlug: string
  readonly resolution: number
  readonly seed: number
  readonly image?: string
  readonly blocksToSwap?: number
}

export function buildUpscaleServingJob(params: UpscaleServingJobParams) {
  const image = params.image ?? refOf(upscaleClusterImage)
  const blocksToSwap = params.blocksToSwap ?? DEFAULT_BLOCKS_TO_SWAP

  const env: readonly EnvVar[] = [
    { name: "HOME", value: "/tmp" },
    { name: ORIGIN_ENV, value: PAGES_ORIGIN },
    { name: "UPSCALE_BLOCKS_TO_SWAP", value: String(blocksToSwap) },
    { name: "UPSCALE_RES", value: String(params.resolution) },
    { name: "UPSCALE_SEED", value: String(params.seed) },
    { name: "UPSCALE_IN_SLUG", value: params.inSlug },
  ]

  return {
    apiVersion: "batch/v1",
    kind: "Job",
    metadata: { name: params.jobName, namespace: UPSCALE_SERVING_NAMESPACE },
    spec: {
      backoffLimit: 0,
      ttlSecondsAfterFinished: TTL_SECONDS_AFTER_FINISHED,
      activeDeadlineSeconds: ACTIVE_DEADLINE_SECONDS,
      template: {
        spec: {
          restartPolicy: "Never",
          runtimeClassName: "nvidia",
          nodeSelector: gpuVramUsableMinSelector(GPU_VRAM_TIER),
          securityContext: { seccompProfile: { type: "RuntimeDefault" } },
          containers: [
            {
              name: "upscale",
              image,
              imagePullPolicy: "Always",
              command: ["bash", "/runner/bench-runner.sh"],
              env,
              resources: {
                requests: { cpu: "4", memory: UPSCALE_JOB_MEMORY, "nvidia.com/gpu": "1" },
                limits: { cpu: "8", memory: UPSCALE_JOB_MEMORY, "nvidia.com/gpu": "1" },
              },
              volumeMounts: [{ name: "weight-cache", mountPath: UPSCALE_WEIGHT_CACHE_MOUNT }],
            },
          ],
          volumes: [
            {
              name: "weight-cache",
              hostPath: { path: UPSCALE_WEIGHT_CACHE_HOSTPATH, type: "DirectoryOrCreate" },
            },
          ],
        },
      },
    },
  }
}
