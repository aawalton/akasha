import type { Alert } from "../alert.page-type.ts"

export const subscriberLag = {
  id: "01a06755-62fb-7e20-b27c-e1110a2c8e90",
  pageTypeSlug: "alert",
  slug: "subscriber-lag",
  title: "Subscriber lag",
  definition: "a subscriber has fallen behind the event stream",
  domain: "change-harness",
} as const satisfies Alert
