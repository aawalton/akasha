import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallHymnsGodTheEternalFather = {
  id: "01a0b4c8-625f-7e03-8c62-0d031b577854",
  type: "page-type/track",
  slug: "paul-cardall-hymns-god-the-eternal-father",
  ownLength: 2.6086666666666667,
  ownProgress: 2.6086666666666667,
  partOfCollections: ["release/paul-cardall-hymns"],
  status: "completed",
  unit: "unit/minutes",
  title: "God, The Eternal Father",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "godtheeternalfather|7FQRbf8gbKw8KZQZAJWxH2|156520",
  song: "song/paul-cardall-god-the-eternal-father",
  carriedBy: [
    {
      release: "release/paul-cardall-hymns",
      discNumber: 1,
      position: 2,
      externalId: "4I1uJTHsyMZ2dbdZD4A4nJ",
      externalLink: "https://open.spotify.com/track/4I1uJTHsyMZ2dbdZD4A4nJ",
    },
  ],
} as const satisfies Track
