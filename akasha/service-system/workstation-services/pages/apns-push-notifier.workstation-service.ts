import type { WorkstationService } from "../workstation-service.page-type.ts"

export const apnsPushNotifier = {
  id: "01a06829-0193-7bb7-858d-8cb22b1eb62d",
  pageTypeSlug: "workstation-service",
  slug: "apns-push-notifier",
  definition: "the service putting each notification written for Alan on his devices",
  runs: ["bun akasha/alan/harness/notifications/push-notifying/push-notifying.module.code.ts"],
  enabled: true,
  systemd: {
    restartDelaySeconds: 10,
  },
  invariants: [
    {
      invariantKind: "departure",
      statement: "Nothing is sent while `APNS_AUTH_KEY_P8` is unset, and the feed is followed.",
    },
    {
      invariantKind: "departure",
      statement:
        "A push is claimed before it is sent, so a notification read twice is pushed once.",
    },
    {
      invariantKind: "departure",
      statement:
        "A start begins at the newest notification standing rather than at the feed's head.",
    },
    {
      invariantKind: "departure",
      statement: "No push carries an app-icon badge, and nothing refreshes one.",
    },
    {
      invariantKind: "gap",
      statement: "The service runs.",
    },
  ],
} as const satisfies WorkstationService
