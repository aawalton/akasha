import type { Domain } from "../../../domains/domains/domain.page-type.ts"

export const alanwaltonIosNotification = {
  id: "01a0675b-16d5-73ec-b556-2248facf0650",
  pageTypeSlug: "domain",
  slug: "alanwalton-ios-notification",
  definition: "a notification delivered to a phone by Apple's push service",
  partSlugs: [
    "module/apns-sending",
    "module/push-device-tokens",
    "module/push-notifier-tick",
    "module/push-notifying",
    "module/push-payload",
  ],
} as const satisfies Domain
