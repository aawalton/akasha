import type { RecordProperty } from "@akasha/pages/record-property"
import type { RescuedAccessToken } from "./rescued-access-token.text-property.ts"
import type { RescuedExpiresAtMs } from "./rescued-expires-at-ms.number-property.ts"
import type { RescuedRefreshToken } from "./rescued-refresh-token.text-property.ts"

export type RescuedCredential = {
  accessToken: RescuedAccessToken
  refreshToken: RescuedRefreshToken
  expiresAtMs: RescuedExpiresAtMs
}

export const rescuedCredential = {
  id: "01a0637b-78bb-77e3-8457-23dd0863e27e",
  pageTypeSlug: "record-property",
  slug: "rescued-credential",
  propertySlug: "rescued-credential",
  definition: "the rotated pair kept beside a page where no landing carried that pair",
  properties: [
    { pagePropertySlug: "text-property/rescued-access-token", required: true, many: false },
    { pagePropertySlug: "text-property/rescued-refresh-token", required: true, many: false },
    { pagePropertySlug: "number-property/rescued-expires-at-ms", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rescued credential is written only where the sops file did not take the pair.",
    },
    {
      invariantKind: "departure",
      statement: "A rescued credential is taken away by the push that lands the pair in sops.",
    },
    {
      invariantKind: "departure",
      statement: "A rescued credential is a reading rather than a value an account states.",
    },
    {
      invariantKind: "departure",
      statement: "The file a rescued credential is written into is narrowed before that write.",
    },
  ],
} as const satisfies RecordProperty
