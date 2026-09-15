import type { BlackAt } from "akasha/alan/harness/readout/scale/properties/black-at.number-property.types.ts"
import type { BlueAt } from "akasha/alan/harness/readout/scale/properties/blue-at.number-property.types.ts"
import type { EarnedColorSlug } from "akasha/alan/harness/readout/scale/properties/earned-color-slug.text-property.types.ts"
import type { GreenAt } from "akasha/alan/harness/readout/scale/properties/green-at.number-property.types.ts"
import type { OrangeAt } from "akasha/alan/harness/readout/scale/properties/orange-at.number-property.types.ts"
import type { RedAt } from "akasha/alan/harness/readout/scale/properties/red-at.number-property.types.ts"
import type { YellowAt } from "akasha/alan/harness/readout/scale/properties/yellow-at.number-property.types.ts"
import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export type ReadoutScale = Domain & {
  blackAt?: BlackAt
  redAt?: RedAt
  orangeAt?: OrangeAt
  yellowAt?: YellowAt
  greenAt?: GreenAt
  blueAt?: BlueAt
  earnedColorSlug?: EarnedColorSlug
}
