import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const checkoutMaintaining = {
  id: "01a197e6-1c12-7d12-98a0-1422cf87eaf6",
  type: "page-type/service-workstation",
  slug: "checkout-maintaining",
  definition: "the service packing the loose objects of the checkout landings write to",
  enabled: true,
  systemd: {
    schedule: "hourly",
    jitterSeconds: 300,
  },
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The hourly run the checkout's own maintenance settings ask for is this service.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A run packs loose objects and nothing else, so it moves no ref and locks no HEAD.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run holds the lock a landing holds, so no landing and no run overlap.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A run packs a bounded batch, so a landing waiting on it waits less than its wait.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run past its bound is ended, and the next run packs that batch again.",
    },
  ],
  createdAt: "2026-11-01T16:16:42.513Z",
  updatedAt: "2026-11-01T16:16:42.513Z",
} as const satisfies ServiceWorkstation
