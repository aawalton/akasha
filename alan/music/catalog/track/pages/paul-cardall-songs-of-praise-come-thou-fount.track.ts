import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSongsOfPraiseComeThouFount = {
  id: "01a0b4c8-50fb-7536-8199-edc48105ebfb",
  type: "page-type/track",
  slug: "paul-cardall-songs-of-praise-come-thou-fount",
  ownLength: 2.346216666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-songs-of-praise"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1LJg1ICfSlgpUcMXCe4KSz",
      externalLink: "https://open.spotify.com/track/1LJg1ICfSlgpUcMXCe4KSz",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Come Thou Fount",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "comethoufount|7FQRbf8gbKw8KZQZAJWxH2|140773",
  song: "song/paul-cardall-come-thou-fount",
} as const satisfies Track
