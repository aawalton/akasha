import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2ThatSWhyIMHereOnlyOne = {
  id: "01a0abeb-42ac-783d-8e09-8048d53bde48",
  type: "page-type/track",
  slug: "james-taylor-2-that-s-why-i-m-here-only-one",
  ownLength: 4.304433333333333,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-that-s-why-i-m-here"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "05re487C0a3bJNZnPfDqMp",
      externalLink: "https://open.spotify.com/track/05re487C0a3bJNZnPfDqMp",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Only One",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "onlyone|0vn7UBvSQECKJm2817Yf1P|258266",
} as const satisfies Track
