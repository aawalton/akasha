import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { CtwScope } from "akasha/product/game/clear-the-world/ctw-achievement/properties/ctw-scope.select-property.types.ts"
import type { Metric } from "akasha/product/game/clear-the-world/ctw-achievement/properties/metric.text-property.types.ts"
import type { Threshold } from "akasha/product/game/clear-the-world/ctw-achievement/properties/threshold.number-property.types.ts"

export type CtwAchievement = Page & {
  title: Title
  scope: CtwScope
  metric: Metric
  threshold: Threshold
}
