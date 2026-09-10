import type { Page } from "../../pages/page.page-type.types.ts"
import type { Placements } from "./properties/placements.record-property.ts"
import type { SecretValue } from "./properties/secret-value.text-property.ts"

export type Secret = Page & {
  placements: Placements
  value?: SecretValue
}
