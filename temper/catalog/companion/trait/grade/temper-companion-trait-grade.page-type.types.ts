import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { TemperCompanionThing } from "akasha/temper/catalog/companion/thing/temper-companion-thing.page-type.types.ts"
import type { CompanionGradeMetric } from "akasha/temper/catalog/companion/trait/grade/properties/companion-grade-metric.relation-property.types.ts"
import type { GradedCompanionTrait } from "akasha/temper/catalog/companion/trait/grade/properties/graded-companion-trait.relation-property.types.ts"
import type { Quality } from "akasha/temper/catalog/thing/properties/quality.relation-property.types.ts"
import type { QualityValue } from "akasha/temper/catalog/thing/properties/quality-value.number-property.types.ts"

export type TemperCompanionTraitGrade = TemperCompanionThing & {
  title: Title
  thing: GradedCompanionTrait
  quality: Quality
  metric: CompanionGradeMetric
  value: QualityValue
}
