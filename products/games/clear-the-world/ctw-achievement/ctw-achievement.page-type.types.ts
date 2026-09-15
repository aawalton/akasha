import type { Metric } from "akasha/alan/track/daily/day/properties/metric.text-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { Threshold } from "akasha/products/games/clear-the-world/ctw-achievement/properties/threshold.number-property.types.ts"
import type { Scope } from "akasha/temper/progress/thing/properties/scope.text-property.types.ts"

export type CtwAchievement = Page & {
  title: Title
  scope: Scope
  metric: Metric
  threshold: Threshold
}
