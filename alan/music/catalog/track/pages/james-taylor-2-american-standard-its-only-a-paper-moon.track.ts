import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2AmericanStandardItsOnlyAPaperMoon = {
  id: "01a0abeb-2f9b-7045-8456-794e277a871d",
  type: "page-type/track",
  slug: "james-taylor-2-american-standard-its-only-a-paper-moon",
  ownLength: 3.1982166666666667,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-american-standard"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5hDZjGuwlmGEgbPf0yjj4z",
      externalLink: "https://open.spotify.com/track/5hDZjGuwlmGEgbPf0yjj4z",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "It's Only A Paper Moon",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "itsonlyapapermoon|0vn7UBvSQECKJm2817Yf1P|191893",
} as const satisfies Track
