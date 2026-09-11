import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Placements } from "akasha/services/secrets/properties/placements.record-property.ts"
import type { SecretValue } from "akasha/services/secrets/properties/secret-value.text-property.ts"

export type Secret = Page & {
  placements: Placements
  value?: SecretValue
}
