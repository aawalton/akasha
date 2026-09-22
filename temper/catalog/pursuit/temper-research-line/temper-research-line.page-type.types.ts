import type { ResearchLineCraft } from "akasha/temper/catalog/pursuit/temper-research-line/properties/research-line-craft.relation-property.types.ts"
import type { Traits } from "akasha/temper/catalog/pursuit/temper-research-line/properties/traits.page-property-entry.types.ts"
import type { TemperPursuitThing } from "akasha/temper/catalog/pursuit/thing/temper-pursuit-thing.page-type.types.ts"
import type { DisplayOrder } from "akasha/temper/thing/properties/display-order.number-property.types.ts"

export type TemperResearchLine = TemperPursuitThing & {
  displayOrder: DisplayOrder
  traits: Traits
  parent: ResearchLineCraft
}
