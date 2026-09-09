import type { PageType } from "@akasha/pages/page-type"

export const telnyxAccount = {
  id: "01a06861-e7cd-7e44-b19a-09599abde817",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "telnyx-account",
  definition: "the account the system sends texts through",
  pluralSlug: "telnyx-accounts",
  extends: ["page-type/page"],
  parts: [
    "phone-number-property/telnyx-account-from-number",
    "text-property/telnyx-account-api-key",
  ],
  properties: [
    {
      pageProperty: "phone-number-property/telnyx-account-from-number",
      required: true,
      many: false,
    },
    {
      pageProperty: "text-property/telnyx-account-api-key",
      required: false,
      many: false,
      secret: true,
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The key is in the sops file beside the page and never in the page.",
    },
    {
      invariantKind: "departure",
      statement: "The number a text is sent from is on the account rather than in the environment.",
    },
    {
      invariantKind: "gap",
      statement: "The accounts are pages under this type rather than markdown.",
    },
  ],
  types: "ts",
} as const satisfies PageType
