import type { ReadoutWidget } from "akasha/alan/harness/readout/widget/readout-widget.page-type.types.ts"

export const alanwaltonSafetyLevel = {
  id: "01a06420-b259-7d0c-85e8-0e67ee23e107",
  type: "page-type/readout-widget",
  slug: "alanwalton-safety-level",
  definition: "the readout widget on Alan's phone that shows how safe Alan feels",
  app: "ios-app/alanwalton",
  component: "ios-component/alanwalton-safety-level-widget",
  kind: "SafetyLevelWidget",
  families: ["small"],
  feed: "https://alanwalton.com/api/safety-level",
  caption: "Safety",
  galleryName: "Safety",
  galleryDescription: "Where your safety level is today.",
  opens:
    "capacitor://localhost/nav/tracking-690c624f?tab=019edbf5-d4ea-7380-a6be-bc7496dbb24c#widget=alanwalton-safety-level",
  groups: ["readout-group/safety"],
  place: 9,
  createdAt: "2026-09-02T21:57:39.545Z",
  updatedAt: "2026-10-30T15:59:15.970Z",
} as const satisfies ReadoutWidget
