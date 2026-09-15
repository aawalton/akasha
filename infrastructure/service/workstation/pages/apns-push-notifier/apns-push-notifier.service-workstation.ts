import type { ServiceWorkstation } from "akasha/infrastructure/service/workstation/service-workstation.page-type.types.ts"

export const apnsPushNotifier = {
  id: "01a06829-0193-7bb7-858d-8cb22b1eb62d",
  type: "service-workstation",
  slug: "apns-push-notifier",
  definition: "the service putting each notification written for Alan on his devices",
  enabled: true,
  needsSecrets: true,
  systemd: {
    restartDelaySeconds: 10,
  },
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Nothing is sent while `APNS_AUTH_KEY_P8` is unset.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The feed is followed while `APNS_AUTH_KEY_P8` is unset.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A push is claimed before that push is sent.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A notification read twice is pushed once.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A start begins at the newest notification there rather than at the feed's head.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No push has an app-icon badge.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing refreshes an app-icon badge.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "The service runs.",
    },
  ],
} as const satisfies ServiceWorkstation
