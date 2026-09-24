import type { Placements } from "akasha/infrastructure/service/akasha-service/secret/properties/placements.record-property.types.ts"
import type { SecretValue } from "akasha/infrastructure/service/akasha-service/secret/properties/secret-value.text-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"

export type Secret = Page & {
  placements?: Placements
  value?: SecretValue
}
