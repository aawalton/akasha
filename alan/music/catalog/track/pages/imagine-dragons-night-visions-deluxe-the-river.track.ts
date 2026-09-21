import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsNightVisionsDeluxeTheRiver = {
  id: "01a0c43f-d87f-723d-ac0b-391c035b7559",
  type: "page-type/track",
  slug: "imagine-dragons-night-visions-deluxe-the-river",
  ownLength: 3.4004333333333334,
  ownProgress: 0,
  partOfCollections: ["release/imagine-dragons-night-visions-deluxe"],
  position: 14,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6fFnFIlj8LEHy7991Znnud",
      externalLink: "https://open.spotify.com/track/6fFnFIlj8LEHy7991Znnud",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "The River",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "theriver|53XhwfbYqKCa1cC15pYq2q|204026",
  song: "song/imagine-dragons-the-river",
} as const satisfies Track
