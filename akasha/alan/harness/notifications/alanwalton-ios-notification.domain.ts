import type { Domain } from "../../../domain-system/domains/domain.page-type.ts"

export const alanwaltonIosNotification = {
  id: "01a0675b-16d5-73ec-b556-2248facf0650",
  pageTypeSlug: "domain",
  slug: "alanwalton-ios-notification",
  definition: "a notification delivered to a phone by Apple's push service",
  partSlugs: ["module/push-notifying"],
} as const satisfies Domain
