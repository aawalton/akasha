import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardall40HymnsForGuitarGabrielsOboe = {
  id: "01a0b4c8-1ce1-7055-b99d-cf17d658b6c8",
  type: "page-type/track",
  slug: "paul-cardall-40-hymns-for-guitar-gabriels-oboe",
  ownLength: 2.55,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-40-hymns-for-guitar"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Gabriel's Oboe",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "gabrielsoboe|7FQRbf8gbKw8KZQZAJWxH2|153000",
  song: "song/paul-cardall-gabriels-oboe",
  carriedBy: [
    {
      release: "release/paul-cardall-40-hymns-for-guitar",
      discNumber: 1,
      position: 33,
      externalId: "4OA0vYJWu3WMa8Z12ex6ri",
      externalLink: "https://open.spotify.com/track/4OA0vYJWu3WMa8Z12ex6ri",
    },
  ],
} as const satisfies Track
