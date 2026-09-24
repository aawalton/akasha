import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const royalRoadAccount = {
  id: "01a06838-e8da-73c2-8412-6234b402ec6a",
  type: "page-type/page-type",
  slug: "royal-road-account",
  definition: "the Royal Road sync's login for Alan's follow list",
  extends: ["page-type/page"],
  parts: ["email-address-property/royal-road-email", "text-property/royal-road-password"],
  properties: [
    { pageProperty: "email-address-property/royal-road-email", required: true, many: false },
    {
      pageProperty: "text-property/royal-road-password",
      required: true,
      many: false,
      secret: true,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An account is the sign-in rather than any story reached through that account.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The password authorising an account's sign-in is held as a secret rather than as text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An account is reached by its slug rather than by the address that account signs in as.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The sync signs in as no account and reads only the pages open to anyone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The address an account signs in as is in the cluster's secrets too.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
