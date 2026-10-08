import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const dcgmExporter = {
  id: "01a06829-0194-7abe-a29a-b073b8c32332",
  type: "page-type/service-workstation",
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
  createdAt: "2026-09-03T16:45:12.980Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies ServiceWorkstation
