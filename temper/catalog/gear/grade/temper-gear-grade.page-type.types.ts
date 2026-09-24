import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { GradeMetric } from "akasha/temper/catalog/gear/grade/properties/grade-metric.relation-property.types.ts"
import type { GradedThing } from "akasha/temper/catalog/gear/grade/properties/graded-thing.relation-property.types.ts"
import type { TemperGearThing } from "akasha/temper/catalog/gear/thing/temper-gear-thing.page-type.types.ts"
import type { Quality } from "akasha/temper/catalog/thing/properties/quality.relation-property.types.ts"
import type { QualityValue } from "akasha/temper/catalog/thing/properties/quality-value.number-property.types.ts"

export type TemperGearGrade = TemperGearThing & {
  title: Title
  thing: GradedThing
  quality: Quality
  metric?: GradeMetric
  value: QualityValue
}
