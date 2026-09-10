import type { Metric } from "../../../alan/track/daily/days/properties/metric.text-property.ts"
import type { Page } from "../../../pages/page.page-type.types.ts"
import type { Title } from "../../../pages/properties/title.text-property.ts"
import type { Scope } from "../../../temper/progressions/things/properties/scope.text-property.ts"
import type { Threshold } from "./properties/threshold.number-property.ts"

export type CtwAchievement = Page & {
  title: Title
  scope: Scope
  metric: Metric
  threshold: Threshold
}
