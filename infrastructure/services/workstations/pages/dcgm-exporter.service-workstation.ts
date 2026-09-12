import type { ServiceWorkstation } from "akasha/infrastructure/services/workstations/service-workstation.page-type.types.ts"

export const dcgmExporter = {
  id: "01a06829-0194-7abe-a29a-b073b8c32332",
  type: "service-workstation",
  slug: "dcgm-exporter",
  definition: "the service publishing the workstation GPU as metrics: memory, use, heat and power",
  enabled: true,
  needsSecrets: false,
  systemd: {
    after: ["network-online.target"],
    wants: ["network-online.target"],
    stops: ["/usr/bin/podman stop dcgm-exporter"],
    restart: "on-failure",
    restartDelaySeconds: 10,
  },
} as const satisfies ServiceWorkstation
