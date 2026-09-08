import type { WorkstationService } from "../workstation-service.page-type.ts"

export const nodeExporter = {
  id: "01a06829-0194-7b8c-b075-9bab1fe4e693",
  pageTypeSlug: "workstation-service",
  slug: "node-exporter",
  definition:
    "the service publishing the workstation's processor, memory, disk and network as metrics",
  runs: ["/home/linuxbrew/.linuxbrew/bin/node_exporter --web.listen-address=:9100"],
  enabled: true,
  needsSecrets: false,
  systemd: {
    restart: "on-failure",
    restartDelaySeconds: 5,
  },
} as const satisfies WorkstationService
