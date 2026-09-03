import type { WorkstationService } from "../workstation-service.page-type.ts"

export const inboxTrackingPoll = {
  id: "01a06829-0194-7b3e-8aaf-32073fb983f2",
  pageTypeSlug: "workstation-service",
  slug: "inbox-tracking-poll",
  definition: "the service refreshing the inbox counts the statusline shows",
  runs: ["bun services/inbox-tracking-poll.ts"],
  enabled: true,
  systemd: {
    schedule: "*:0/5",
    catchUp: true,
  },
} as const satisfies WorkstationService
