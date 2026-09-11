import type { BlackAt } from "akasha/alan/harness/readouts/scales/properties/black-at.number-property.types.ts"
import type { BlueAt } from "akasha/alan/harness/readouts/scales/properties/blue-at.number-property.types.ts"
import type { EarnedColorSlug } from "akasha/alan/harness/readouts/scales/properties/earned-color-slug.text-property.types.ts"
import type { GreenAt } from "akasha/alan/harness/readouts/scales/properties/green-at.number-property.types.ts"
import type { OrangeAt } from "akasha/alan/harness/readouts/scales/properties/orange-at.number-property.types.ts"
import type { RedAt } from "akasha/alan/harness/readouts/scales/properties/red-at.number-property.types.ts"
import type { YellowAt } from "akasha/alan/harness/readouts/scales/properties/yellow-at.number-property.types.ts"
import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export type ReadoutScale = Domain & {
  blackAt?: BlackAt
  redAt?: RedAt
  orangeAt?: OrangeAt
  yellowAt?: YellowAt
  greenAt?: GreenAt
  blueAt?: BlueAt
  earnedColorSlug?: EarnedColorSlug
}
