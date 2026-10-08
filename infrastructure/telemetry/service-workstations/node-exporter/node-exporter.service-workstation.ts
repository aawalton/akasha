import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const nodeExporter = {
  id: "01a06829-0194-7b8c-b075-9bab1fe4e693",
  type: "page-type/service-workstation",
  slug: "node-exporter",
  definition:
    "the service publishing the workstation's processor, memory, disk and network as metrics",
  enabled: true,
  needsSecrets: false,
  systemd: {
    restart: "on-failure",
    restartDelaySeconds: 5,
  },
  createdAt: "2026-09-03T16:45:12.980Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies ServiceWorkstation
