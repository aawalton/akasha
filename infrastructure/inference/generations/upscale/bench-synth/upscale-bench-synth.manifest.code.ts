import { readFileSync } from "node:fs"
import { join } from "node:path"

import { synthMulti } from "akasha/infrastructure/cluster/k8s-types/cdk8s-synth/cdk8s-synth.module.code.ts"
import { gpuVramUsableMinSelector } from "akasha/infrastructure/cluster/k8s-types/hostnames/hostnames.module.code.ts"
import { ownRepoRoot } from "akasha/pages/checkout-roots/checkout-roots.module.code.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { listedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"

const NAMESPACE = "seaweedfs"

const IMAGE = "registry.registry.svc.cluster.local:5000/cluster/upscale-cu121:14565"

const RUNNER_CONFIGMAP = "upscale-3080ti-bench-runner"
const S3_ENDPOINT = "http://s3-gateway.seaweedfs.svc.cluster.local:8333"

const LABELS = {
  "app.kubernetes.io/name": "upscale-3080ti-bench",
  "app.kubernetes.io/part-of": "upscale",
  "app.kubernetes.io/component": "gpu-benchmark",
  "app.kubernetes.io/managed-by": "bootstrap",
  project: "14565",
} as const

const SCRIPT = "shell-script"

const BENCH_RUNNER = "upscale-bench-runner"

const SHELL = "shell"

const SH = "sh"

function runnerAt(): string {
  const root = ownRepoRoot()
  const page = listedAt(root, SCRIPT, BENCH_RUNNER)[0]
  const at = page === undefined ? null : besideAt(page.path, SHELL, SH)
  if (at === null) {
    throw new Error(`no \`${SCRIPT}\` is slugged \`${BENCH_RUNNER}\`, so the job has no runner`)
  }
  return join(root, at)
}

const RUNNER = readFileSync(runnerAt(), "utf8")

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    {
      name: "upscale-3080ti-bench",
      yaml: synthMulti(NAMESPACE, [
        {
          id: "upscale-3080ti-bench-runner",
          manifest: {
            apiVersion: "v1",
            kind: "ConfigMap",
            metadata: { name: RUNNER_CONFIGMAP, namespace: NAMESPACE, labels: LABELS },
            data: { "bench-runner.sh": RUNNER },
          } as const,
        },
        {
          id: "upscale-3080ti-bench",
          manifest: {
            apiVersion: "batch/v1",
            kind: "Job",
            metadata: { name: "upscale-3080ti-bench", namespace: NAMESPACE, labels: LABELS },
            spec: {
              backoffLimit: 0,
              ttlSecondsAfterFinished: 86400,
              activeDeadlineSeconds: 1800,
              template: {
                metadata: { labels: LABELS },
                spec: {
                  restartPolicy: "Never",
                  runtimeClassName: "nvidia",
                  nodeSelector: gpuVramUsableMinSelector("8gi"),
                  securityContext: { seccompProfile: { type: "RuntimeDefault" } },
                  containers: [
                    {
                      name: "bench",
                      image: IMAGE,
                      imagePullPolicy: "Always",
                      command: ["bash", "/runner/bench-runner.sh"],
                      env: [
                        { name: "HOME", value: "/tmp" },
                        { name: "SEAWEEDFS_S3_ENDPOINT", value: S3_ENDPOINT },
                        {
                          name: "SEAWEEDFS_ACCESS_KEY",
                          valueFrom: {
                            secretKeyRef: { name: "seaweedfs-creds", key: "access_key" },
                          },
                        },
                        {
                          name: "SEAWEEDFS_SECRET_KEY",
                          valueFrom: {
                            secretKeyRef: { name: "seaweedfs-creds", key: "secret_key" },
                          },
                        },
                        { name: "S3_BUCKET", value: "upscale-14565" },
                        { name: "UPSCALE_BLOCKS_TO_SWAP", value: "24" },
                        { name: "UPSCALE_RES", value: "1460" },
                        { name: "UPSCALE_SEED", value: "12345" },
                        { name: "UPSCALE_IN", value: "closeup-a.png" },
                        { name: "UPSCALE_OUT", value: "closeup-3080ti-cu121.png" },
                      ],
                      resources: {
                        requests: { cpu: "4", memory: "24Gi", "nvidia.com/gpu": "1" },
                        limits: { cpu: "8", memory: "24Gi", "nvidia.com/gpu": "1" },
                      },
                      volumeMounts: [{ name: "runner", mountPath: "/runner" }],
                    },
                  ],
                  volumes: [{ name: "runner", configMap: { name: RUNNER_CONFIGMAP } }],
                },
              },
            },
          } as const,
        },
      ]),
    },
  ]
}
