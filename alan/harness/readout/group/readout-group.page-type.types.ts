import type { FigureOffScale } from "akasha/alan/harness/readout/group/properties/figure-off-scale.boolean-property.types.ts"
import type { StatusBarSection } from "akasha/alan/harness/readout/group/properties/status-bar-section.text-property.types.ts"
import type { WireKeyName } from "akasha/alan/harness/readout/group/properties/wire-key-name.text-property.types.ts"
import type { ServedBy } from "akasha/alan/harness/readout/properties/served-by.multi-relation-property.types.ts"
import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export type ReadoutGroup = Domain & {
  figureOffScale?: FigureOffScale
  wireKeyName?: WireKeyName
  servedBy?: ServedBy
  statusBarSection?: StatusBarSection
}
