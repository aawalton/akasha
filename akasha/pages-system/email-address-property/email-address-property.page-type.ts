import type { PageProperty } from "../page-property/page-property.page-type.ts"
import type { PageType } from "../page-type/page-type.page-type.ts"

export type EmailAddressProperty = PageProperty

export const emailAddressProperty = {
  id: "01a053ef-69a0-7d7d-ac01-f2cb92cc7c63",
  pageTypeSlug: "page-type",
  slug: "email-address-property",
  definition: "a page property holding an address mail is sent to",
  pluralSlug: "email-address-properties",
  extendsSlug: "page-type/page-property",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An address is written in lowercase, so two addresses compare as text without being folded first.",
    },
    {
      invariantKind: "departure",
      statement: "An address holds one `@`, dividing the mailbox from the domain it stands at.",
    },
    {
      invariantKind: "departure",
      statement:
        "A mailbox tagged after `+` reaches the mailbox itself, so two addresses parting only there are one reach.",
    },
    {
      invariantKind: "departure",
      statement:
        "An address reaching 254 characters is the longest there is, so none states a max.",
    },
  ],
} as const satisfies PageType
