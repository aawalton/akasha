import type { Domain } from "../../domain-system/domain/domain.page-type.ts"
import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"
import type { BlackAt } from "./properties/black-at.number-property.ts"
import type { BlueAt } from "./properties/blue-at.number-property.ts"
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
}

export const readoutScale = {
  id: "01a05446-e75f-756a-b8d9-4288a350957f",
  pageTypeSlug: "page-type",
  slug: "readout-scale",
  definition: "what turns a reading into a color",
  pluralSlug: "readout-scales",
  partSlugs: [
    "readout-scale/backlog-count",
    "number-property/black-at",
    "number-property/blue-at",
    "number-property/green-at",
    "number-property/orange-at",
    "number-property/red-at",
    "number-property/yellow-at",
  ],
  extendsSlug: "page-type/domain",
  properties: [
    { pagePropertySlug: "black-at", required: false, many: false },
    { pagePropertySlug: "red-at", required: false, many: false },
    { pagePropertySlug: "orange-at", required: false, many: false },
    { pagePropertySlug: "yellow-at", required: false, many: false },
    { pagePropertySlug: "green-at", required: false, many: false },
    { pagePropertySlug: "blue-at", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A scale is named by the readings drawn against it and belongs to none of them.",
    },
    {
      invariantKind: "departure",
      statement: "A scale's rungs run black and red and orange and yellow and green and blue.",
    },
    {
      invariantKind: "departure",
      statement: "A scale states only the rungs it has.",
    },
    {
      invariantKind: "departure",
      statement: "Rising numbers make a scale ascend and falling ones descend.",
    },
    {
      invariantKind: "departure",
      statement: "Black stands at zero unless a scale moves it.",
    },
    {
      invariantKind: "constraint",
      statement: "Orange is a rung a stoplight strip cannot draw.",
    },
  ],
} as const satisfies PageType
