import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsItSTimeEpDolphins = {
  id: "01a0c43f-e599-78dd-bceb-ac2ad46750de",
  type: "page-type/track",
  slug: "imagine-dragons-it-s-time-ep-dolphins",
  ownLength: 3.5444333333333335,
  ownProgress: 3.5444333333333335,
  partOfCollections: ["release/imagine-dragons-it-s-time-ep"],
  position: 9,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "64Gy3bhlqlVGY6H4q0E8no",
      externalLink: "https://open.spotify.com/track/64Gy3bhlqlVGY6H4q0E8no",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Dolphins",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "dolphins|53XhwfbYqKCa1cC15pYq2q|212666",
  song: "song/imagine-dragons-dolphins",
} as const satisfies Track
