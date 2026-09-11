import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const alanwaltonIosNotification = {
  id: "01a0675b-16d5-73ec-b556-2248facf0650",
  type: "domain",
  slug: "alanwalton-ios-notification",
  definition: "a notification delivered to a phone by Apple's push service",
  parts: [
    "module/apns-sending",
    "module/push-device-tokens",
    "module/push-notifier-tick",
    "module/push-notifying",
    "module/push-payload",
    "service-workstation/apns-push-notifier",
  ],
} as const satisfies Domain
