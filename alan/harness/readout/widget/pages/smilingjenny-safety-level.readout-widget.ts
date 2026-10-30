import type { ReadoutWidget } from "akasha/alan/harness/readout/widget/readout-widget.page-type.types.ts"

export const smilingjennySafetyLevel = {
  id: "01a06420-b259-70dc-adcb-88ca53d210cf",
  type: "page-type/readout-widget",
  slug: "smilingjenny-safety-level",
  definition: "the readout widget on Jenny's phone that shows how safe Alan feels",
  app: "ios-app/smilingjenny",
  component: "ios-component/smilingjenny-safety-level-widget",
  kind: "SafetyLevelWidget",
  families: ["small"],
  feed: "https://smilingjenny.me/api/safety-level",
  caption: "Alan's Safety",
  galleryName: "Safety",
  galleryDescription: "Where Alan's safety level is today.",
  groups: ["readout-group/safety"],
  place: 2,
  createdAt: "2026-09-02T21:57:39.545Z",
  updatedAt: "2026-10-30T15:59:50.124Z",
} as const satisfies ReadoutWidget
