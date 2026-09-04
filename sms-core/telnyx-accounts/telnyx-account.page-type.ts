import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { TelnyxAccountApiKey } from "./properties/telnyx-account-api-key.text-property.ts"
import type { TelnyxAccountFromNumber } from "./properties/telnyx-account-from-number.phone-number-property.ts"

export type TelnyxAccount = Page & {
  fromNumber: TelnyxAccountFromNumber
  apiKey?: TelnyxAccountApiKey
}

export const telnyxAccount = {
  id: "01a06861-e7cd-7e44-b19a-09599abde817",
  pageTypeSlug: "page-type",
  slug: "telnyx-account",
  definition: "the account the system sends texts through",
  pluralSlug: "telnyx-accounts",
  extendsSlug: ["page-type/page"],
  partSlugs: [
    "phone-number-property/telnyx-account-from-number",
    "text-property/telnyx-account-api-key",
  ],
  properties: [
    { pagePropertySlug: "telnyx-account-from-number", required: true, many: false },
    { pagePropertySlug: "telnyx-account-api-key", required: false, many: false, secret: true },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The key stands in the sops file beside the page and never in the page.",
    },
    {
      invariantKind: "departure",
      statement:
        "The number a text is sent from stands on the account rather than in the environment.",
    },
    {
      invariantKind: "gap",
      statement: "The accounts stand as pages under this type rather than as markdown.",
    },
  ],
} as const satisfies PageType
