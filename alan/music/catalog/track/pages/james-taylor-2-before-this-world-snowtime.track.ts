import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2BeforeThisWorldSnowtime = {
  id: "01a0abeb-3095-7114-82b1-a9c3a6b176b4",
  type: "page-type/track",
  slug: "james-taylor-2-before-this-world-snowtime",
  ownLength: 5.8091,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-before-this-world"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0ciNBuuJYP1EvG8LDpShWk",
      externalLink: "https://open.spotify.com/track/0ciNBuuJYP1EvG8LDpShWk",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "SnowTime",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "snowtime|0vn7UBvSQECKJm2817Yf1P|348546",
  song: "song/james-taylor-snowtime",
} as const satisfies Track
