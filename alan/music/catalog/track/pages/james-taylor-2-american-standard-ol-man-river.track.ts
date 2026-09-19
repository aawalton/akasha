import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2AmericanStandardOlManRiver = {
  id: "01a0abeb-2f79-7696-8f84-78e6d82e8fa0",
  type: "page-type/track",
  slug: "james-taylor-2-american-standard-ol-man-river",
  ownLength: 2.8922166666666667,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-american-standard"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1Kz5feZb5jE6skMT6R9vkd",
      externalLink: "https://open.spotify.com/track/1Kz5feZb5jE6skMT6R9vkd",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Ol' Man River",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "olmanriver|0vn7UBvSQECKJm2817Yf1P|173533",
  song: "song/james-taylor-ol-man-river",
} as const satisfies Track
