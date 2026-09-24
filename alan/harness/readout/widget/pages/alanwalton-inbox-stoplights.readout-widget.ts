import type { ReadoutWidget } from "akasha/alan/harness/readout/widget/readout-widget.page-type.types.ts"

export const alanwaltonInboxStoplights = {
  id: "01a06420-b259-7991-800b-7019c1efb1c2",
  type: "page-type/readout-widget",
  slug: "alanwalton-inbox-stoplights",
  definition: "the tile on Alan's phone showing how much waits in each of his inboxes",
  app: "ios-app/alanwalton",
  component: "ios-component/alanwalton-inbox-stoplights-widget",
  kind: "InboxStoplightsWidget",
  families: ["small"],
  feed: "https://alanwalton.com/api/inbox-stoplights",
  galleryName: "Inboxes",
  galleryDescription: "Your four inbox stoplights, at a glance.",
  opens: "capacitor://localhost/nav/tasks-a7242626#widget=alanwalton-inbox-stoplights",
  groups: ["readout-group/inboxes"],
  place: 3,
} as const satisfies ReadoutWidget
