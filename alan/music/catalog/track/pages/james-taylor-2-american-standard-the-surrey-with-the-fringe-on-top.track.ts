import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2AmericanStandardTheSurreyWithTheFringeOnTop = {
  id: "01a0abeb-2fbc-7463-8948-2f94d4707126",
  type: "page-type/track",
  slug: "james-taylor-2-american-standard-the-surrey-with-the-fringe-on-top",
  ownLength: 3.334,
  ownProgress: 3.334,
  partOfCollections: ["release/james-taylor-2-american-standard"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3kJJtv9juaxcspjbC1bNXT",
      externalLink: "https://open.spotify.com/track/3kJJtv9juaxcspjbC1bNXT",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "The Surrey With The Fringe On Top",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "thesurreywiththefringeontop|0vn7UBvSQECKJm2817Yf1P|200040",
  song: "song/james-taylor-the-surrey-with-the-fringe-on-top",
  carriedBy: [
    {
      release: "release/james-taylor-2-american-standard",
      discNumber: 1,
      position: 14,
      externalId: "3kJJtv9juaxcspjbC1bNXT",
      externalLink: "https://open.spotify.com/track/3kJJtv9juaxcspjbC1bNXT",
    },
  ],
} as const satisfies Track
