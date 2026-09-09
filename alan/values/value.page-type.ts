import type { Domain } from "@akasha/domains/domain"
import type { PageType } from "@akasha/pages/page-type"
import type { Description } from "../../pages/properties/description.text-property.ts"
import type { Groups } from "../../readouts/properties/groups.relation-property.ts"
import type { Label } from "../../readouts/properties/label.text-property.ts"
import type { Place } from "../../readouts/properties/place.number-property.ts"
import type { QueryArgument } from "../../readouts/properties/query-argument.text-property.ts"
import type { QueryKey } from "../../readouts/properties/query-key.text-property.ts"
import type { QuerySlug } from "../../readouts/properties/query-slug.text-property.ts"
import type { Enabled } from "../../readouts/properties/readout-enabled.boolean-property.ts"
import type { Scale } from "../../readouts/properties/scale.relation-property.ts"
import type { Unit } from "../../readouts/properties/unit.text-property.ts"
import type { ValueColor } from "./properties/value-color.relation-property.ts"

export type Value = Domain & {
  label: Label
  description?: Description
  color?: ValueColor
  place: Place
  unit?: Unit
  scale?: Scale
  groups?: Groups
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
  parts: [
    "relation-property/value-color",
    "value/faith",
    "value/fun",
    "value/health",
    "value/learn",
    "value/love",
    "value/wealth",
  ],
  extends: ["page-type/domain"],
  properties: [
    { pageProperty: "text-property/label", required: true, many: false },
    { pageProperty: "relation-property/value-color", required: false, many: false },
    { pageProperty: "number-property/place", required: true, many: false },
    { pageProperty: "text-property/unit", required: false, many: false },
    { pageProperty: "relation-property/scale", required: false, many: false },
    {
      pageProperty: "relation-property/groups",
      required: false,
      many: true,
      maxCount: null,
    },
    { pageProperty: "text-property/query-slug", required: false, many: false },
    { pageProperty: "text-property/query-key", required: false, many: false },
    { pageProperty: "text-property/query-argument", required: false, many: false },
    {
      pageProperty: "boolean-property/readout-enabled",
      required: false,
      many: false,
      default: "true",
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A value states in one line the person a life serving that value makes.",
    },
    {
      invariantKind: "departure",
      statement: "A value names the query answering that value rather than holding the question.",
    },
    {
      invariantKind: "departure",
      statement: "A value has the points earned against the value over the whole record.",
    },
    {
      invariantKind: "departure",
      statement: "A value names its scale rather than carrying a scale.",
    },
    {
      invariantKind: "departure",
      statement: "A value has one place whatever groups draw the value.",
    },
    {
      invariantKind: "departure",
      statement: "A value states one color and is always drawn in that color.",
    },
    {
      invariantKind: "departure",
      statement: "The points a value has are read from the personas' days rather than declared.",
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
