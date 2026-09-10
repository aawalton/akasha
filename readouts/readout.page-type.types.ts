import type { Module } from "../code-system/modules/module.page-type.ts"
import type { Attribute } from "./properties/attribute.relation-property.ts"
import type { ColorFrom } from "./properties/color-from.relation-property.ts"
import type { ColorSlug } from "./properties/color-slug.text-property.ts"
import type { DrawnAs } from "./properties/drawn-as.text-property.ts"
import type { EarnedKey } from "./properties/earned-key.text-property.ts"
import type { Groups } from "./properties/groups.relation-property.ts"
import type { Label } from "./properties/label.text-property.ts"
import type { LastValue } from "./properties/last-value.number-property.ts"
import type { LastValueAt } from "./properties/last-value-at.instant-property.ts"
import type { NoneLeftEmoji } from "./properties/none-left-emoji.text-property.ts"
import type { NoneLeftWords } from "./properties/none-left-words.text-property.ts"
import type { Place } from "./properties/place.number-property.ts"
import type { QueryArgument } from "./properties/query-argument.text-property.ts"
import type { QueryKey } from "./properties/query-key.text-property.ts"
import type { QuerySlug } from "./properties/query-slug.text-property.ts"
import type { ReadLiveFrom } from "./properties/read-live-from.relation-property.ts"
import type { ReadoutEnabled } from "./properties/readout-enabled.boolean-property.ts"
import type { Scale } from "./properties/scale.relation-property.ts"
import type { Unit } from "./properties/unit.text-property.ts"
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
  querySlug?: QuerySlug
  queryKey?: QueryKey
  queryArgument?: QueryArgument
  readLiveFrom?: ReadLiveFrom
  enabled?: ReadoutEnabled
  lastValue?: LastValue
  lastValueAt?: LastValueAt
}
