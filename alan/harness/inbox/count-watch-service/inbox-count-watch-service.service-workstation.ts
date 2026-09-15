import type { ServiceWorkstation } from "akasha/infrastructure/service/workstation/service-workstation.page-type.types.ts"

export const inboxCountWatchService = {
  id: "01a079df-057d-7957-b80e-f75d73b1705c",
  type: "service-workstation",
  slug: "inbox-count-watch-service",
  definition: "the service taking the task counts again the moment a page lands",
  enabled: true,
  needsSecrets: true,
  systemd: {
    restart: "on-failure",
    restartDelaySeconds: 5,
    startLimitIntervalSeconds: 0,
  },
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The unit running the watch is simple rather than a timer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Repeated starts are counted over no window.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A watch failing all night keeps on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The site the counts are carried to is named here rather than held as a secret.",
    },
  ],
} as const satisfies ServiceWorkstation
