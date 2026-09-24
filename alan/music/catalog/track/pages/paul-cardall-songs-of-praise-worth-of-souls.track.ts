import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSongsOfPraiseWorthOfSouls = {
  id: "01a0b4c8-5170-77d4-9006-dcedf410b672",
  type: "page-type/track",
  slug: "paul-cardall-songs-of-praise-worth-of-souls",
  ownLength: 4.382883333333333,
  ownProgress: 4.382883333333333,
  partOfCollections: ["release/paul-cardall-songs-of-praise"],
  status: "completed",
  unit: "unit/minutes",
  title: "Worth of Souls",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "worthofsouls|7FQRbf8gbKw8KZQZAJWxH2|262973",
  song: "song/paul-cardall-worth-of-souls",
  carriedBy: [
    {
      release: "release/paul-cardall-songs-of-praise",
      discNumber: 1,
      position: 4,
      externalId: "3t1XKqfufpfKjVglmCeYpn",
      externalLink: "https://open.spotify.com/track/3t1XKqfufpfKjVglmCeYpn",
    },
  ],
} as const satisfies Track
