import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSongsOfPraiseDeeper = {
  id: "01a0b4c8-51e3-7ac9-b377-39e94a85d250",
  type: "page-type/track",
  slug: "paul-cardall-songs-of-praise-deeper",
  ownLength: 3.584216666666667,
  ownProgress: 3.584216666666667,
  partOfCollections: ["release/paul-cardall-songs-of-praise"],
  status: "completed",
  unit: "unit/minutes",
  title: "Deeper",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "deeper|7FQRbf8gbKw8KZQZAJWxH2|215053",
  song: "song/paul-cardall-deeper",
  carriedBy: [
    {
      release: "release/paul-cardall-songs-of-praise",
      discNumber: 1,
      position: 7,
      externalId: "6tC5rqZb9iuIAxVS30HHAq",
      externalLink: "https://open.spotify.com/track/6tC5rqZb9iuIAxVS30HHAq",
    },
  ],
} as const satisfies Track
