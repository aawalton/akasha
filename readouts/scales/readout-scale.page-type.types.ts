import type { Domain } from "../../domains/domain.page-type.ts"
import type { BlackAt } from "./properties/black-at.number-property.ts"
import type { BlueAt } from "./properties/blue-at.number-property.ts"
import type { EarnedColorSlug } from "./properties/earned-color-slug.text-property.ts"
import type { GreenAt } from "./properties/green-at.number-property.ts"
import type { OrangeAt } from "./properties/orange-at.number-property.ts"
import type { RedAt } from "./properties/red-at.number-property.ts"
import type { YellowAt } from "./properties/yellow-at.number-property.ts"

export type ReadoutScale = Domain & {
  blackAt?: BlackAt
  redAt?: RedAt
  orangeAt?: OrangeAt
  yellowAt?: YellowAt
  greenAt?: GreenAt
  blueAt?: BlueAt
  earnedColorSlug?: EarnedColorSlug
}
