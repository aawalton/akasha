import type { ReadoutWidget } from "akasha/alan/harness/readout/widget/readout-widget.page-type.types.ts"

export const smilingjennyConnection = {
  id: "01a1358f-67b0-7398-b48f-98b8246948bd",
  type: "page-type/readout-widget",
  slug: "smilingjenny-connection",
  definition: "the tile on Jenny's phone showing how much of Alan's day was at ease with her",
  app: "ios-app/smilingjenny",
  component: "ios-component/smilingjenny-connection-widget",
  kind: "ConnectionWidget",
  families: ["small"],
  feed: "https://smilingjenny.me/api/connection",
  caption: "Connection",
  galleryName: "Connection",
  galleryDescription: "How much of Alan's day was spent at ease with you.",
  groups: ["readout-group/connection"],
  place: 5,
  createdAt: "2026-10-13T13:59:13.071Z",
  updatedAt: "2026-10-13T13:59:13.071Z",
} as const satisfies ReadoutWidget
