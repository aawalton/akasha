import type { ServiceWorkstation } from "akasha/infrastructure/services/workstations/service-workstation.page-type.types.ts"

export const memoryReaper = {
  id: "01a06829-0194-7550-9679-6801bad16b9f",
  type: "service-workstation",
  slug: "memory-reaper",
  definition: "the service killing an agent tree when the workstation runs short of memory",
  enabled: true,
  systemd: {
    restartDelaySeconds: 5,
  },
} as const satisfies ServiceWorkstation
