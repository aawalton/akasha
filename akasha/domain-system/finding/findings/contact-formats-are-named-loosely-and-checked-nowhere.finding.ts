import type { Finding } from "../finding.page-type.ts"

export const contactFormatsAreNamedLooselyAndCheckedNowhere = {
  id: "01a05a1c-4d80-7000-9c31-6f2a1b7e4d05",
  pageTypeSlug: "finding",
  slug: "contact-formats-are-named-loosely-and-checked-nowhere",
  domainSlug: "workspace-package/pages-system",
  claim:
    "The two contact property types state their formats in prose that names no standard precisely enough to validate against, and no code validates a value of either type.",
  evidence:
    "`phone-number-property` states `A number is written in E.164 and opens with `+` and holds digits alone.` and `A number carries its own country calling code.` The second names a country calling code without naming what assigns one; E.164 is named on the first line only. `email-address-property` states lowercase, one `@`, `+` tagging and 254 characters, naming neither RFC 5321 nor RFC 5322. Both types set no name format and no max. The only pages of either type are `person/phone`, `persona/email-address` and `person/email-address`, none of which declare a format. Searching the tree for `E.164`, `phoneNumber` and `phone-number` finds `tools/commands/sms/send.ts` and the pages themselves, and nothing parses or rejects a value. So a value of either type is held to nothing at write time, and a reader cannot tell which standard the prose means.",
} as const satisfies Finding
