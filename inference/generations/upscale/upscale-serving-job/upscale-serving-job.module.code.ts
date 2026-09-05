import { gpuVramUsableMinSelector } from "@akasha/k8s-types/hostnames"

export const UPSCALE_SERVING_IMAGE =
  "registry.registry.svc.cluster.local:5000/cluster/upscale-cu121:serving"

export const UPSCALE_SERVING_NAMESPACE = "seaweedfs"

export const UPSCALE_SERVING_BUCKET = "upscale"

const S3_ENDPOINT = "http://s3-gateway.seaweedfs.svc.cluster.local:8333"

const GPU_VRAM_TIER = "8gi" as const

export const UPSCALE_WEIGHT_CACHE_HOSTPATH = "/var/lib/upscale-weights"
export const UPSCALE_WEIGHT_CACHE_MOUNT = "/app/ComfyUI/models/SEEDVR2"

const TTL_SECONDS_AFTER_FINISHED = 3600
const ACTIVE_DEADLINE_SECONDS = 1800
const DEFAULT_BLOCKS_TO_SWAP = 24

export const UPSCALE_JOB_MEMORY = "16Gi"

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
  readonly inName: string
  readonly outName: string
  readonly resolution: number
  readonly seed: number
  readonly bucket?: string
  readonly image?: string
  readonly blocksToSwap?: number
}

export function buildUpscaleServingJob(params: UpscaleServingJobParams) {
  const bucket = params.bucket ?? UPSCALE_SERVING_BUCKET
  const image = params.image ?? UPSCALE_SERVING_IMAGE
  const blocksToSwap = params.blocksToSwap ?? DEFAULT_BLOCKS_TO_SWAP

  const env: readonly EnvVar[] = [
    { name: "HOME", value: "/tmp" },
    { name: "SEAWEEDFS_S3_ENDPOINT", value: S3_ENDPOINT },
    {
      name: "SEAWEEDFS_ACCESS_KEY",
      valueFrom: { secretKeyRef: { name: "seaweedfs-creds", key: "access_key" } },
    },
    {
      name: "SEAWEEDFS_SECRET_KEY",
      valueFrom: { secretKeyRef: { name: "seaweedfs-creds", key: "secret_key" } },
    },
    { name: "S3_BUCKET", value: bucket },
    { name: "UPSCALE_BLOCKS_TO_SWAP", value: String(blocksToSwap) },
    { name: "UPSCALE_RES", value: String(params.resolution) },
    { name: "UPSCALE_SEED", value: String(params.seed) },
    { name: "UPSCALE_IN", value: params.inName },
    { name: "UPSCALE_OUT", value: params.outName },
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
