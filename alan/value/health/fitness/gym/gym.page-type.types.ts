import type { GymEveryImplement } from "akasha/alan/value/health/fitness/gym/properties/gym-every-implement.boolean-property.types.ts"
import type { GymHolds } from "akasha/alan/value/health/fitness/gym/properties/gym-holds.multi-relation-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type Gym = Page & {
  title: Title
  everyImplement: GymEveryImplement
  holds?: GymHolds
}
