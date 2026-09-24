import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallDecemberPianoStringEnsembleNewMoonRising = {
  id: "01a0b4c8-2d04-78eb-bbeb-82bc16f4b1df",
  type: "page-type/track",
  slug: "paul-cardall-december-piano-string-ensemble-new-moon-rising",
  ownLength: 3.62155,
  ownProgress: 3.62155,
  partOfCollections: [
    "release/paul-cardall-december-piano-string-ensemble",
    "release/paul-cardall-new-moon-rising",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "New Moon Rising",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "newmoonrising|7FQRbf8gbKw8KZQZAJWxH2|217293",
  song: "song/paul-cardall-new-moon-rising",
  carriedBy: [
    {
      release: "release/paul-cardall-december-piano-string-ensemble",
      discNumber: 1,
      position: 3,
      externalId: "1q07To1TuNfMYxVfFPW7TV",
      externalLink: "https://open.spotify.com/track/1q07To1TuNfMYxVfFPW7TV",
    },
    {
      release: "release/paul-cardall-new-moon-rising",
      discNumber: 1,
      position: 1,
      externalId: "0U7wLLlzyuPPExoPtzCPvw",
      externalLink: "https://open.spotify.com/track/0U7wLLlzyuPPExoPtzCPvw",
    },
  ],
} as const satisfies Track
