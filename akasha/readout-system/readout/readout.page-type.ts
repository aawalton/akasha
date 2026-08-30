import type { Module } from "../../code-system/module/module.page-type.ts"
import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"
import type { GroupSlugs } from "./properties/group-slugs.relation-property.ts"
import type { Label } from "./properties/label.text-property.ts"
import type { LastValue } from "./properties/last-value.number-property.ts"
import type { LastValueAt } from "./properties/last-value-at.instant-property.ts"
import type { NoneLeftEmoji } from "./properties/none-left-emoji.text-property.ts"
import type { NoneLeftWords } from "./properties/none-left-words.text-property.ts"
import type { Place } from "./properties/place.number-property.ts"
import type { ScaleSlug } from "./properties/scale-slug.relation-property.ts"
import type { Unit } from "./properties/unit.text-property.ts"
import type { WireKey } from "./properties/wire-key.text-property.ts"

export type Readout = Module & {
  label: Label
  unit?: Unit
  place: Place
  scaleSlug?: ScaleSlug
  groupSlugs?: GroupSlugs
  noneLeftWords?: NoneLeftWords
  noneLeftEmoji?: NoneLeftEmoji
  wireKey: WireKey
  lastValue?: LastValue
  lastValueAt?: LastValueAt
}

export const readout = {
  id: "01a05446-e760-7cb2-848b-4fcfc7ed45d4",
  pageTypeSlug: "page-type",
  slug: "readout",
  definition: "one reading a person is shown",
  pluralSlug: "readouts",
  partSlugs: [
    "instant-property/last-value-at",
    "number-property/last-value",
    "number-property/place",
    "relation-property/group-slugs",
    "relation-property/scale-slug",
    "text-property/label",
    "text-property/none-left-emoji",
    "text-property/none-left-words",
    "text-property/unit",
    "text-property/wire-key",
  ],
  extendsSlug: "page-type/module",
  properties: [
    { pagePropertySlug: "label", required: true, many: false },
    { pagePropertySlug: "unit", required: false, many: false },
    { pagePropertySlug: "place", required: true, many: false },
    { pagePropertySlug: "scale-slug", required: false, many: false },
    { pagePropertySlug: "group-slugs", required: false, many: true, max: null },
    { pagePropertySlug: "none-left-words", required: false, many: false },
    { pagePropertySlug: "none-left-emoji", required: false, many: false },
    { pagePropertySlug: "wire-key", required: true, many: false },
    { pagePropertySlug: "last-value", required: false, many: false, uncommitted: true },
    { pagePropertySlug: "last-value-at", required: false, many: false, uncommitted: true },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A readout takes its own reading, the page carrying the code that takes it.",
    },
    {
      invariantKind: "departure",
      statement: "A readout names its scale rather than carrying one.",
    },
    {
      invariantKind: "departure",
      statement: "A readout carries its label and unit, and nothing about how they are drawn.",
    },
    {
      invariantKind: "departure",
      statement: "A readout carries one place, whatever groups draw it.",
    },
    {
      invariantKind: "departure",
      statement: "The reading a readout last took is carried outside the commit.",
    },
    {
      invariantKind: "gap",
      statement:
        "What a readout shows is stated on the readout; where and how big is the display's.",
    },
  ],
} as const satisfies PageType
