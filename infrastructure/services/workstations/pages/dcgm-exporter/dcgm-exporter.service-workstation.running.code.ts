import { runBinary } from "akasha/infrastructure/services/workstations/modules/binary-running/binary-running.module.code.ts"

const ARGV = [
  "/usr/bin/podman",
  "run",
  "--rm",
  "--replace",
  "--name",
  "dcgm-exporter",
  "--device",
  "nvidia.com/gpu=all",
  "-p",
  "9400:9400",
  "nvcr.io/nvidia/k8s/dcgm-exporter:3.3.8-3.6.0-ubuntu22.04",
]

export async function runService(): Promise<never> {
  return await runBinary(ARGV)
}
