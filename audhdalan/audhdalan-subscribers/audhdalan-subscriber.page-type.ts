import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { SubscriberEmail } from "./properties/subscriber-email.email-address-property.ts"

export type AudhdalanSubscriber = Page & {
  email: SubscriberEmail
}

export const audhdalanSubscriber = {
  id: "019e2701-19cb-71d9-a820-bddf28cec176",
  pageTypeSlug: "page-type",
  slug: "audhdalan-subscriber",
  definition: "someone who asked to hear when Alan publishes",
  pluralSlug: "audhdalan-subscribers",
  extendsSlug: "page-type/page",
  partSlugs: ["email-address-property/subscriber-email"],
  properties: [{ pagePropertySlug: "email", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A subscriber is slugged from the address the subscriber gave.",
    },
    {
      invariantKind: "departure",
      statement: "The same address given again reaches the subscriber already filed here.",
    },
    {
      invariantKind: "departure",
      statement: "A subscriber arrives from the subscribe form audhdalan.com serves.",
    },
  ],
} as const satisfies PageType
