import type { HappenedAt } from "akasha/alan/track/food-entry/properties/happened-at.instant-property.types.ts"
import type { Rejected } from "akasha/alan/track/rejection/properties/rejected.boolean-property.types.ts"
import type { Risks } from "akasha/alan/track/rejection/properties/risks.number-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type Rejection = Page & {
  title: Title
  happenedAt: HappenedAt
  rejected: Rejected
  risks?: Risks
}
