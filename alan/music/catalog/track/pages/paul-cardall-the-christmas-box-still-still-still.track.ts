import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheChristmasBoxStillStillStill = {
  id: "01a0b4c8-6662-7c51-911b-847f939fada5",
  type: "page-type/track",
  slug: "paul-cardall-the-christmas-box-still-still-still",
  ownLength: 2.3033333333333332,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-christmas-box"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2Wb98m8lm2krd0sKP3NnE5",
      externalLink: "https://open.spotify.com/track/2Wb98m8lm2krd0sKP3NnE5",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Still, Still, Still",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "stillstillstill|7FQRbf8gbKw8KZQZAJWxH2|138200",
  song: "song/paul-cardall-still-still-still",
} as const satisfies Track
