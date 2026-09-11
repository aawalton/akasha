import type { Placements } from "akasha/infrastructure/services/secrets/properties/placements.record-property.types.ts"
import type { SecretValue } from "akasha/infrastructure/services/secrets/properties/secret-value.text-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"

export type Secret = Page & {
  placements: Placements
  value?: SecretValue
}
