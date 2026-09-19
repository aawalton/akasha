import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2BeforeThisWorldWatchinOverMe = {
  id: "01a0abeb-307a-7734-a836-f7302b2a2f39",
  type: "page-type/track",
  slug: "james-taylor-2-before-this-world-watchin-over-me",
  ownLength: 4.128,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-before-this-world"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0STxFgJBkPlJXEI2dlr0rw",
      externalLink: "https://open.spotify.com/track/0STxFgJBkPlJXEI2dlr0rw",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Watchin’ Over Me",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "watchinoverme|0vn7UBvSQECKJm2817Yf1P|247680",
  song: "song/james-taylor-watchin-over-me",
} as const satisfies Track
