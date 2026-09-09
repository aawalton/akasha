import type { WorkstationService } from "akasha/services/workstation-services/workstation-service.page-type.ts"

export const inboxCountWatchService = {
  id: "01a079df-057d-7957-b80e-f75d73b1705c",
  pageTypeSlug: "workstation-service",
  type: "workstation-service",
  slug: "inbox-count-watch-service",
  definition: "the service taking the task counts again the moment a page lands",
  runs: [
    "bun alan/harness/inboxes/inbox-count-watch/inbox-count-watch.module.code.ts https://alanwalton.com",
  ],
  enabled: true,
  needsSecrets: true,
  systemd: {
    restart: "on-failure",
    restartDelaySeconds: 5,
    startLimitIntervalSeconds: 0,
  },
  invariants: [
    {
      invariantKind: "departure",
      statement: "The unit running the watch is simple rather than a timer.",
    },
    {
      invariantKind: "departure",
      statement: "Repeated starts are counted over no window.",
    },
    {
      invariantKind: "departure",
      statement: "A watch failing all night keeps on.",
    },
    {
      invariantKind: "departure",
      statement: "The site the counts are carried to is named here rather than held as a secret.",
    },
  ],
} as const satisfies WorkstationService
