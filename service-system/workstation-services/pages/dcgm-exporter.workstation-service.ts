import type { WorkstationService } from "../workstation-service.page-type.ts"

export const dcgmExporter = {
  id: "01a06829-0194-7abe-a29a-b073b8c32332",
  pageTypeSlug: "workstation-service",
  slug: "dcgm-exporter",
  definition: "the service publishing the workstation GPU as metrics: memory, use, heat and power",
  runs: [
    "/usr/bin/podman run --rm --replace --name dcgm-exporter --device nvidia.com/gpu=all -p 9400:9400 nvcr.io/nvidia/k8s/dcgm-exporter:3.3.8-3.6.0-ubuntu22.04",
  ],
  enabled: true,
  needsSecrets: false,
  systemd: {
    after: ["network-online.target"],
    wants: ["network-online.target"],
    stops: ["/usr/bin/podman stop dcgm-exporter"],
    restart: "on-failure",
    restartDelaySeconds: 10,
  },
} as const satisfies WorkstationService
