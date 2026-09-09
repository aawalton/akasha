import type { PageType } from "@akasha/pages/page-type"

export const smsDiscard = {
  id: "019fee8b-0d29-7123-afe0-de23c4c7338d",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "sms-discard",
  definition: "one inbound text message that was thrown away, and why",
  pluralSlug: "sms-discards",
  extends: ["page-type/page"],
  parts: [
    "instant-property/sms-discard-discarded-at",
    "text-property/sms-discard-reason",
    "text-property/sms-discard-sender",
  ],
  properties: [
    { pageProperty: "text-property/sms-discard-sender", required: true, many: false },
    { pageProperty: "text-property/sms-discard-reason", required: true, many: false },
    { pageProperty: "instant-property/sms-discard-discarded-at", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A discard holds who sent the message and why the message was thrown away.",
    },
    {
      invariantKind: "absence",
      statement: "A discard has no part of the message thrown away.",
    },
    {
      invariantKind: "departure",
      statement:
        "A discard's slug is the instant the message was thrown away with colon and dot as hyphen.",
    },
    {
      invariantKind: "gap",
      statement: "An SMS this system turns away lands as a page under this type.",
    },
  ],
  types: "ts",
} as const satisfies PageType
