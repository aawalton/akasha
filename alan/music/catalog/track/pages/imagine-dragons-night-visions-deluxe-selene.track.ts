import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsNightVisionsDeluxeSelene = {
  id: "01a0c43f-d8d5-7157-9b41-4158d5ad9217",
  type: "page-type/track",
  slug: "imagine-dragons-night-visions-deluxe-selene",
  ownLength: 4.0011,
  ownProgress: 0,
  partOfCollections: ["release/imagine-dragons-night-visions-deluxe"],
  position: 16,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2TaTzAv5PQxDbfjvS7KWXB",
      externalLink: "https://open.spotify.com/track/2TaTzAv5PQxDbfjvS7KWXB",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Selene",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "selene|53XhwfbYqKCa1cC15pYq2q|240066",
  song: "song/imagine-dragons-selene",
} as const satisfies Track
