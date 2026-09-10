import type { Module } from "../../../code-system/modules/module.page-type.types.ts"
import type { Attribute } from "./properties/attribute.relation-property.types.ts"
import type { ColorFrom } from "./properties/color-from.relation-property.types.ts"
import type { ColorSlug } from "./properties/color-slug.text-property.ts"
import type { DrawnAs } from "./properties/drawn-as.select-property.ts"
import type { EarnedKey } from "./properties/earned-key.text-property.ts"
import type { Groups } from "./properties/groups.relation-property.types.ts"
import type { Label } from "./properties/label.text-property.ts"
import type { LastValue } from "./properties/last-value.number-property.types.ts"
import type { LastValueAt } from "./properties/last-value-at.instant-property.types.ts"
import type { LastValueFallsPerHour } from "./properties/last-value-falls-per-hour.number-property.types.ts"
import type { NoneLeftEmoji } from "./properties/none-left-emoji.text-property.ts"
import type { NoneLeftWords } from "./properties/none-left-words.text-property.ts"
import type { Place } from "./properties/place.number-property.types.ts"
import type { ReadLiveFrom } from "./properties/read-live-from.relation-property.types.ts"
import type { ReadoutEnabled } from "./properties/readout-enabled.boolean-property.types.ts"
import type { Scale } from "./properties/scale.relation-property.types.ts"
import type { Unit } from "./properties/unit.text-property.ts"
import type { WentSilentAt } from "./properties/went-silent-at.instant-property.types.ts"
import type { WireKey } from "./properties/wire-key.text-property.ts"

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
