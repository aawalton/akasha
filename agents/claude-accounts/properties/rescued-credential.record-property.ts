import type { RecordProperty } from "@akasha/pages-system/record-property"
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
    { pagePropertySlug: "rescued-access-token", required: true, many: false },
    { pagePropertySlug: "rescued-refresh-token", required: true, many: false },
    { pagePropertySlug: "rescued-expires-at-ms", required: true, many: false },
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
      statement: "A rescued credential is a reading rather than what an account states.",
    },
    {
      invariantKind: "departure",
      statement: "The file a rescued credential is written into is narrowed before that write.",
    },
  ],
} as const satisfies RecordProperty
