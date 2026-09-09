import type { WorkstationService } from "../workstation-service.page-type.ts"

export const apnsPushNotifier = {
  id: "01a06829-0193-7bb7-858d-8cb22b1eb62d",
  pageTypeSlug: "workstation-service",
  type: "workstation-service",
  slug: "apns-push-notifier",
  definition: "the service putting each notification written for Alan on his devices",
  runs: [
    "bun alan/harness/alanwalton-ios-notification/push-notifying/push-notifying.module.code.ts",
  ],
  enabled: true,
  needsSecrets: true,
  systemd: {
    restartDelaySeconds: 10,
  },
  invariants: [
    {
      invariantKind: "departure",
      statement: "Nothing is sent while `APNS_AUTH_KEY_P8` is unset.",
    },
    {
      invariantKind: "departure",
      statement: "The feed is followed while `APNS_AUTH_KEY_P8` is unset.",
    },
    {
      invariantKind: "departure",
      statement: "A push is claimed before that push is sent.",
    },
    {
      invariantKind: "departure",
      statement: "A notification read twice is pushed once.",
    },
    {
      invariantKind: "departure",
      statement: "A start begins at the newest notification there rather than at the feed's head.",
    },
    {
      invariantKind: "departure",
      statement: "No push has an app-icon badge.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing refreshes an app-icon badge.",
    },
    {
      invariantKind: "gap",
      statement: "The service runs.",
    },
  ],
} as const satisfies WorkstationService
