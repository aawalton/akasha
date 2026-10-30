import type { ReadoutWidget } from "akasha/alan/harness/readout/widget/readout-widget.page-type.types.ts"

export const alanwaltonInboxStoplights = {
  id: "01a06420-b259-7991-800b-7019c1efb1c2",
  type: "page-type/readout-widget",
  slug: "alanwalton-inbox-stoplights",
  definition:
    "the readout widget on Alan's phone that shows how many things wait in each inbox Alan has",
  app: "ios-app/alanwalton",
  component: "ios-component/alanwalton-inbox-stoplights-widget",
  kind: "InboxStoplightsWidget",
  families: ["small"],
  feed: "https://alanwalton.com/api/inbox-stoplights",
  galleryName: "Inboxes",
  galleryDescription: "Your three inbox stoplights, at a glance.",
  opens: "capacitor://localhost/nav/tasks-a7242626#widget=alanwalton-inbox-stoplights",
  groups: ["readout-group/inboxes"],
  place: 3,
  createdAt: "2026-09-02T21:57:39.545Z",
  updatedAt: "2026-10-30T16:13:40.603Z",
} as const satisfies ReadoutWidget
