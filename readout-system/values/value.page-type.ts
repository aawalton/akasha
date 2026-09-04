import type { Domain } from "@akasha/domains/domain"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Description } from "../../temper/temper-things/properties/description.text-property.ts"
import type { GroupSlugs } from "../readouts/properties/group-slugs.relation-property.ts"
import type { Label } from "../readouts/properties/label.text-property.ts"
import type { Place } from "../readouts/properties/place.number-property.ts"
import type { QueryArgument } from "../readouts/properties/query-argument.text-property.ts"
import type { QueryKey } from "../readouts/properties/query-key.text-property.ts"
import type { QuerySlug } from "../readouts/properties/query-slug.text-property.ts"
import type { Enabled } from "../readouts/properties/readout-enabled.boolean-property.ts"
import type { ScaleSlug } from "../readouts/properties/scale-slug.relation-property.ts"
import type { Unit } from "../readouts/properties/unit.text-property.ts"
import type { ValueColorSlug } from "./properties/value-color-slug.relation-property.ts"

export type Value = Domain & {
  label: Label
  description?: Description
  colorSlug?: ValueColorSlug
  place: Place
  unit?: Unit
  scaleSlug?: ScaleSlug
  groupSlugs?: GroupSlugs
  querySlug?: QuerySlug
  queryKey?: QueryKey
  queryArgument?: QueryArgument
  enabled?: Enabled
}

export const value = {
  id: "01a06553-f65f-71f6-898f-df18f6561396",
  pageTypeSlug: "page-type",
  slug: "value",
  definition: "what a person is spending their life on",
  pluralSlug: "values",
  partSlugs: [
    "relation-property/value-color-slug",
    "value/faith",
    "value/fun",
    "value/health",
    "value/learn",
    "value/love",
    "value/wealth",
    "domain/next-persona",
  ],
  extendsSlug: ["page-type/domain"],
  properties: [
    { pagePropertySlug: "label", required: true, many: false },
    { pagePropertySlug: "description", required: false, many: false },
    { pagePropertySlug: "value-color-slug", required: false, many: false },
    { pagePropertySlug: "place", required: true, many: false },
    { pagePropertySlug: "unit", required: false, many: false },
    { pagePropertySlug: "scale-slug", required: false, many: false },
    { pagePropertySlug: "group-slugs", required: false, many: true, max: null },
    { pagePropertySlug: "query-slug", required: false, many: false },
    { pagePropertySlug: "query-key", required: false, many: false },
    { pagePropertySlug: "query-argument", required: false, many: false },
    { pagePropertySlug: "readout-enabled", required: false, many: false, default: "true" },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A value states in one line what the person becomes by serving the value.",
    },
    {
      invariantKind: "departure",
      statement: "A value names the query answering it rather than holding the question.",
    },
    {
      invariantKind: "departure",
      statement: "A value carries the points earned against the value over the whole record.",
    },
    {
      invariantKind: "departure",
      statement: "A value names its scale rather than carrying one.",
    },
    {
      invariantKind: "departure",
      statement: "A value carries one place whatever groups draw the value.",
    },
    {
      invariantKind: "departure",
      statement: "A value states one color and is always drawn in that color.",
    },
    {
      invariantKind: "departure",
      statement:
        "The points a value carries are read from the personas' days rather than declared.",
    },
    {
      invariantKind: "absence",
      statement: "A value takes no reading of its own.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing draws a value.",
    },
  ],
} as const satisfies PageType
