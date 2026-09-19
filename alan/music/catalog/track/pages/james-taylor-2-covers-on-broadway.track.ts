import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2CoversOnBroadway = {
  id: "01a0abeb-34cb-75a2-87d6-29808d3a696e",
  type: "page-type/track",
  slug: "james-taylor-2-covers-on-broadway",
  ownLength: 4.189333333333333,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-covers"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1ts4gAyAd4pLMJDdwp9wCS",
      externalLink: "https://open.spotify.com/track/1ts4gAyAd4pLMJDdwp9wCS",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "On Broadway",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "onbroadway|0vn7UBvSQECKJm2817Yf1P|251360",
  song: "song/james-taylor-on-broadway",
} as const satisfies Track
