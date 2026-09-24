import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const clusterWatching = {
  id: "01a0d4b9-67de-77e3-9320-86d48513932e",
  type: "page-type/service-workstation",
  slug: "cluster-watching",
  definition: "the service looking at whether each cluster service runs as its page states",
  enabled: true,
  systemd: {
    schedule: "*:0/5",
    jitterSeconds: 5,
    startTimeoutSeconds: 120,
  },
} as const satisfies ServiceWorkstation
