import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const anonymousPageTypeSmsConsentWording = {
  id: "01a0e2c7-84b5-7471-acda-345386788d86",
  type: "page-type/person-access",
  slug: "anonymous-page-type-sms-consent-wording",
  person: "person/anonymous",
  accessKind: "access-kind/page-type",
  target: "sms-consent-wording",
  deed: ["access-deed/read"],
} as const satisfies PersonAccess
