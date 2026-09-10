import type { SelectProperty } from "akasha/pages/select-properties/select-property.page-type.types.ts"

export const anchorKind = {
  id: "01a0685e-ef8a-7ceb-bfd2-7d9fbc7e3246",
  pageTypeSlug: "select-property",
  type: "select-property",
  slug: "anchor-kind",
  propertySlug: "kind",
  definition: "how an anchor places what it dates",
  values: [
    "absolute",
    "relative-offset",
    "duration",
    "simultaneity",
    "season-marker",
    "time-of-day",
  ],
} as const satisfies SelectProperty

export type AnchorKind = (typeof anchorKind.values)[number]
