import type { ReadoutWidget } from "../readout-widget.page-type.ts"

export const alanwaltonInboxStoplights = {
  id: "01a06420-b259-7991-800b-7019c1efb1c2",
  pageTypeSlug: "readout-widget",
  slug: "alanwalton-inbox-stoplights",
  definition: "the tile on Alan's phone showing how much waits in each of his inboxes",
  appSlug: "alanwalton",
  componentSlug: "alanwalton-inbox-stoplights-widget",
  kind: "InboxStoplightsWidget",
  families: ["small"],
  feed: "https://alanwalton.com/api/inbox-stoplights",
  galleryName: "Inboxes",
  galleryDescription: "Your three inbox stoplights, at a glance.",
  opens: "capacitor://localhost/nav/tasks-a7242626",
  groupSlugs: ["inboxes"],
  place: 3,
} as const satisfies ReadoutWidget
