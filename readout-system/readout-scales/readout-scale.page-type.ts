import type { Domain } from "@akasha/domain-system/domain"
import type { PageType } from "@akasha/pages-system/page-type"
import type { BlackAt } from "./properties/black-at.number-property.ts"
import type { BlueAt } from "./properties/blue-at.number-property.ts"
import type { EarnedColorSlug } from "./properties/earned-color-slug.text-property.ts"
import type { GreenAt } from "./properties/green-at.number-property.ts"
import type { OrangeAt } from "./properties/orange-at.number-property.ts"
import type { RedAt } from "./properties/red-at.number-property.ts"
import type { YellowAt } from "./properties/yellow-at.number-property.ts"

export type ReadoutScale = Domain & {
  blackAt?: BlackAt
  redAt?: RedAt
  orangeAt?: OrangeAt
  yellowAt?: YellowAt
  greenAt?: GreenAt
  blueAt?: BlueAt
  earnedColorSlug?: EarnedColorSlug
}

export const readoutScale = {
  id: "01a05446-e75f-756a-b8d9-4288a350957f",
  pageTypeSlug: "page-type",
  slug: "readout-scale",
  definition: "what turns a reading into a color",
  pluralSlug: "readout-scales",
  partSlugs: [
    "readout-scale/activity-calories",
    "readout-scale/allowance-hours",
    "readout-scale/attribute-points",
    "readout-scale/backlog-count",
    "readout-scale/capacity-hours",
    "readout-scale/daily-inbox",
    "readout-scale/green-day-units",
    "readout-scale/live-count",
    "readout-scale/lowest-inbox-count",
    "readout-scale/plant-grams",
    "readout-scale/safety-level",
    "readout-scale/sleep-hours",
    "readout-scale/surplus-hours",
    "number-property/black-at",
    "number-property/blue-at",
    "number-property/green-at",
    "number-property/orange-at",
    "number-property/red-at",
    "number-property/yellow-at",
    "text-property/earned-color-slug",
  ],
  extendsSlug: ["page-type/domain"],
  properties: [
    { pagePropertySlug: "black-at", required: false, many: false },
    { pagePropertySlug: "red-at", required: false, many: false },
    { pagePropertySlug: "orange-at", required: false, many: false },
    { pagePropertySlug: "yellow-at", required: false, many: false },
    { pagePropertySlug: "green-at", required: false, many: false },
    { pagePropertySlug: "blue-at", required: false, many: false },
    { pagePropertySlug: "earned-color-slug", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A scale is named by the readings drawn against it and belongs to none of them.",
    },
    {
      invariantKind: "departure",
      statement: "A scale states only the rungs the scale has.",
    },
    {
      invariantKind: "departure",
      statement: "Rising numbers make a scale ascend and falling ones descend.",
    },
    {
      invariantKind: "departure",
      statement: "Black stands at zero unless a scale moves black.",
    },
    {
      invariantKind: "constraint",
      statement: "Orange is a rung a stoplight strip cannot draw.",
    },
    {
      invariantKind: "departure",
      statement: "A scale states the color an earned reading takes rather than a rung.",
    },
    {
      invariantKind: "departure",
      statement: "A scale stating no earned color has no reading earn a color against that scale.",
    },
  ],
} as const satisfies PageType
