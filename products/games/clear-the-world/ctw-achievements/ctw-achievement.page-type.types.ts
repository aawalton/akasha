import type { Metric } from "akasha/alan/track/daily/days/properties/metric.text-property.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.ts"
import type { Threshold } from "akasha/products/games/clear-the-world/ctw-achievements/properties/threshold.number-property.types.ts"
import type { Scope } from "akasha/temper/progressions/things/properties/scope.text-property.types.ts"

export type CtwAchievement = Page & {
  title: Title
  scope: Scope
  metric: Metric
  threshold: Threshold
}
