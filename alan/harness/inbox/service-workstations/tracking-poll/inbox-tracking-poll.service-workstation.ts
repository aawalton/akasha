import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const inboxTrackingPoll = {
  id: "01a06829-0194-7b3e-8aaf-32073fb983f2",
  type: "page-type/service-workstation",
  slug: "inbox-tracking-poll",
  definition: "the service that writes how many things wait in each inbox",
  enabled: true,
  needsSecrets: true,
  systemd: {
    schedule: "*:0/5",
    catchUp: true,
  },
  createdAt: "2026-09-03T16:45:12.980Z",
  updatedAt: "2026-10-30T15:39:40.565Z",
} as const satisfies ServiceWorkstation
