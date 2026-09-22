import { runBinary } from "akasha/infrastructure/service/workstation/modules/binary-running/binary-running.module.code.ts"

const ARGV = [
  "/usr/bin/podman",
  "run",
  "--rm",
  "--replace",
  "--name",
  "dcgm-exporter",
  "--device",
  "nvidia.com/gpu=all",
  "--security-opt",
  "label=disable",
  "-p",
  "9400:9400",
  "nvcr.io/nvidia/k8s/dcgm-exporter:4.2.3-4.1.3-ubuntu22.04",
]

export async function runService(): Promise<never> {
  return await runBinary(ARGV)
}
