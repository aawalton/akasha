import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2FireFoxyLady = {
  id: "01a0abeb-508c-7c9b-a8c0-caeb7d6cab7f",
  type: "page-type/track",
  slug: "james-taylor-2-fire-foxy-lady",
  ownLength: 4.983333333333333,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-fire"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5DM5WjP3EslUWgJaOpGGmT",
      externalLink: "https://open.spotify.com/track/5DM5WjP3EslUWgJaOpGGmT",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Foxy Lady",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" },
    { externalId: "1DJVvIcjKhdedkuGRzW7PG", artistName: "The New Mastersounds" },
  ],
  trackKey: "foxylady|0vn7UBvSQECKJm2817Yf1P,1DJVvIcjKhdedkuGRzW7PG|299000",
} as const satisfies Track
