import type { Attribute } from "akasha/alan/harness/readout/properties/attribute.relation-property.types.ts"
import type { ColorFrom } from "akasha/alan/harness/readout/properties/color-from.relation-property.types.ts"
import type { CountedFrom } from "akasha/alan/harness/readout/properties/counted-from.relation-property.types.ts"
import type { CountedOn } from "akasha/alan/harness/readout/properties/counted-on.select-property.types.ts"
import type { DrawnAs } from "akasha/alan/harness/readout/properties/drawn-as.select-property.types.ts"
import type { Groups } from "akasha/alan/harness/readout/properties/groups.multi-relation-property.types.ts"
import type { Label } from "akasha/alan/harness/readout/properties/label.text-property.types.ts"
import type { LastValue } from "akasha/alan/harness/readout/properties/last-value.number-property.types.ts"
import type { LastValueAt } from "akasha/alan/harness/readout/properties/last-value-at.instant-property.types.ts"
import type { LastValueFallsPerHour } from "akasha/alan/harness/readout/properties/last-value-falls-per-hour.number-property.types.ts"
import type { NoneLeftEmoji } from "akasha/alan/harness/readout/properties/none-left-emoji.text-property.types.ts"
import type { NoneLeftWords } from "akasha/alan/harness/readout/properties/none-left-words.text-property.types.ts"
import type { Place } from "akasha/alan/harness/readout/properties/place.number-property.types.ts"
import type { ReadLiveFrom } from "akasha/alan/harness/readout/properties/read-live-from.relation-property.types.ts"
import type { Reading } from "akasha/alan/harness/readout/properties/reading.module-property-group.ts"
import type { ReadoutColor } from "akasha/alan/harness/readout/properties/readout-color.relation-property.types.ts"
import type { ReadoutEnabled } from "akasha/alan/harness/readout/properties/readout-enabled.boolean-property.types.ts"
import type { Scale } from "akasha/alan/harness/readout/properties/scale.relation-property.types.ts"
import type { Unit } from "akasha/alan/harness/readout/properties/unit.text-property.types.ts"
import type { WireKey } from "akasha/alan/harness/readout/properties/wire-key.text-property.types.ts"
import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export type Readout = Domain & {
  reading?: Reading
  label: Label
  unit?: Unit
  place: Place
  drawnAs?: DrawnAs
  scale?: Scale
  colorFrom?: ColorFrom
  attribute?: Attribute
  groups?: Groups
  noneLeftWords?: NoneLeftWords
  noneLeftEmoji?: NoneLeftEmoji
  wireKey: WireKey
  readLiveFrom?: ReadLiveFrom
  enabled?: ReadoutEnabled
  lastValue?: LastValue
  lastValueAt?: LastValueAt
  lastValueFallsPerHour?: LastValueFallsPerHour
  color?: ReadoutColor
  countedOn?: CountedOn
  countedFrom?: CountedFrom
}
