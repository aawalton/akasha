import type { ReadoutWidget } from "akasha/alan/harness/readout/widget/readout-widget.page-type.types.ts"

export const smilingjennyCategorize = {
  id: "01a05bc7-0b84-7700-8d53-60de383bacaa",
  type: "page-type/readout-widget",
  slug: "smilingjenny-categorize",
  definition:
    "the readout widget on Jenny's phone that shows how many Monarch transactions wait for a person",
  app: "ios-app/smilingjenny",
  component: "ios-component/categorize-ring",
  kind: "CategorizeWidget",
  families: ["small"],
  feed: "https://smilingjenny.me/api/categorization",
  galleryName: "Left to Review",
  galleryDescription:
    "How many of the past year's transactions Monarch is waiting to have reviewed.",
  opens: "capacitor://monarch-relay#widget=smilingjenny-categorize",
  groups: ["readout-group/categorization"],
  place: 1,
  createdAt: "2026-09-01T07:02:46.404Z",
  updatedAt: "2026-10-30T16:35:16.840Z",
} as const satisfies ReadoutWidget
