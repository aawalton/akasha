import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSongsOfPraiseAgnusDei = {
  id: "01a0b4c8-5121-71fb-a09f-dbecefe0ec58",
  type: "page-type/track",
  slug: "paul-cardall-songs-of-praise-agnus-dei",
  ownLength: 5.927333333333333,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-songs-of-praise"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5sIGXXf3iROTkuVwVTd2Jd",
      externalLink: "https://open.spotify.com/track/5sIGXXf3iROTkuVwVTd2Jd",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Agnus Dei",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "agnusdei|7FQRbf8gbKw8KZQZAJWxH2|355640",
  song: "song/paul-cardall-agnus-dei",
} as const satisfies Track
