import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsNightVisionsDeluxeRadioactive = {
  id: "01a0c43f-d65d-7786-8b4b-25cc2ab8469f",
  type: "page-type/track",
  slug: "imagine-dragons-night-visions-deluxe-radioactive",
  ownLength: 3.11355,
  ownProgress: 0,
  partOfCollections: ["release/imagine-dragons-night-visions-deluxe"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "58rFzMvW9kxNwMtGTgBQoP",
      externalLink: "https://open.spotify.com/track/58rFzMvW9kxNwMtGTgBQoP",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Radioactive",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "radioactive|53XhwfbYqKCa1cC15pYq2q|186813",
  song: "song/imagine-dragons-radioactive",
} as const satisfies Track
