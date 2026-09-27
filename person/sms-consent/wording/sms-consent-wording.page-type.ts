import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const smsConsentWording = {
  id: "01a0e2c7-84b5-7ccd-9573-77448bf87556",
  type: "page-type/page-type",
  slug: "sms-consent-wording",
  definition: "the wording a person agrees to in opting in to text messages",
  extends: ["page-type/page"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "text-property/description", required: true, many: false },
    { pageProperty: "text-property/sms-consent-text-version", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The description is the whole wording a person is shown beside the box.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change to the wording states a new version on the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A consent records the version of the wording the person was shown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The wording says how to stop.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
