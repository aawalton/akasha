import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const deviceToken = {
  id: "01a05dc7-77d9-7c93-878e-d93457c7db5f",
  type: "page-type/page-type",
  slug: "device-token",
  definition: "where Apple delivers a push for one app on one device",
  extends: ["page-type/page"],
  mortal: true,
  parts: [
    "instant-property/device-token-last-seen-at",
    "relation-property/device-token-ios-app",
    "relation-property/device-token-person",
    "text-property/device-token-push-type",
    "text-property/device-token-token",
  ],
  properties: [
    { pageProperty: "relation-property/device-token-person", required: true, many: false },
    {
      pageProperty: "relation-property/device-token-ios-app",
      required: true,
      many: false,
    },
    { pageProperty: "text-property/device-token-token", required: true, many: false },
    { pageProperty: "text-property/device-token-push-type", required: false, many: false },
    {
      pageProperty: "instant-property/device-token-last-seen-at",
      required: false,
      many: false,
      uncommitted: true,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A token Apple rejects is dropped rather than kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One device has a token for each app the device runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A device running a live activity has a second token for that activity.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A push goes only to a token taking the sort of push that push is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Registering a token again replaces the token that was there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The app a push reaches is named rather than its bundle restated here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The person is named rather than the account the person signed in under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "When a token was last seen is kept outside the commit.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
