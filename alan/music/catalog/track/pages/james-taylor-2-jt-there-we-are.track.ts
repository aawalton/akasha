import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JtThereWeAre = {
  id: "01a0abeb-45f3-7dcb-9cbf-569a2da184e1",
  type: "page-type/track",
  slug: "james-taylor-2-jt-there-we-are",
  ownLength: 3.0147166666666667,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-jt"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0riYVboaeTLyxByQccC80s",
      externalLink: "https://open.spotify.com/track/0riYVboaeTLyxByQccC80s",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "There We Are",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "thereweare|0vn7UBvSQECKJm2817Yf1P|180883",
  song: "song/james-taylor-there-we-are",
} as const satisfies Track
