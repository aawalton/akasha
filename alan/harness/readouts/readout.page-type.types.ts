import type { Attribute } from "akasha/alan/harness/readouts/properties/attribute.relation-property.types.ts"
import type { ColorFrom } from "akasha/alan/harness/readouts/properties/color-from.relation-property.types.ts"
import type { ColorSlug } from "akasha/alan/harness/readouts/properties/color-slug.text-property.types.ts"
import type { DrawnAs } from "akasha/alan/harness/readouts/properties/drawn-as.select-property.types.ts"
import type { EarnedKey } from "akasha/alan/harness/readouts/properties/earned-key.text-property.types.ts"
import type { Groups } from "akasha/alan/harness/readouts/properties/groups.relation-property.types.ts"
import type { Label } from "akasha/alan/harness/readouts/properties/label.text-property.types.ts"
import type { LastValue } from "akasha/alan/harness/readouts/properties/last-value.number-property.types.ts"
import type { LastValueAt } from "akasha/alan/harness/readouts/properties/last-value-at.instant-property.types.ts"
import type { LastValueFallsPerHour } from "akasha/alan/harness/readouts/properties/last-value-falls-per-hour.number-property.types.ts"
import type { NoneLeftEmoji } from "akasha/alan/harness/readouts/properties/none-left-emoji.text-property.types.ts"
import type { NoneLeftWords } from "akasha/alan/harness/readouts/properties/none-left-words.text-property.types.ts"
import type { Place } from "akasha/alan/harness/readouts/properties/place.number-property.types.ts"
import type { ReadLiveFrom } from "akasha/alan/harness/readouts/properties/read-live-from.relation-property.types.ts"
import type { ReadoutEnabled } from "akasha/alan/harness/readouts/properties/readout-enabled.boolean-property.types.ts"
import type { Scale } from "akasha/alan/harness/readouts/properties/scale.relation-property.types.ts"
import type { Unit } from "akasha/alan/harness/readouts/properties/unit.text-property.types.ts"
import type { WentSilentAt } from "akasha/alan/harness/readouts/properties/went-silent-at.instant-property.types.ts"
import type { WireKey } from "akasha/alan/harness/readouts/properties/wire-key.text-property.types.ts"
import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export type Readout = Module & {
  label: Label
  unit?: Unit
  place: Place
  drawnAs?: DrawnAs
  scale?: Scale
  colorSlug?: ColorSlug
  colorFrom?: ColorFrom
  earnedKey?: EarnedKey
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
  wentSilentAt?: WentSilentAt
}
