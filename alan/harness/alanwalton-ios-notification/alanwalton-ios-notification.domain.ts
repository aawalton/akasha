import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const alanwaltonIosNotification = {
  id: "01a0675b-16d5-73ec-b556-2248facf0650",
  type: "page-type/domain",
  slug: "alanwalton-ios-notification",
  definition: "a notification on Alan's phone",
  parts: [
    "module/apns-sending",
    "module/push-device-tokens",
    "module/push-notifier-tick",
    "module/push-notifying",
    "module/push-payload",
    "service-workstation/apns-push-notifier",
  ],
  createdAt: "2026-09-03T13:00:18.005Z",
  updatedAt: "2026-10-18T13:21:00.027Z",
} as const satisfies Domain
