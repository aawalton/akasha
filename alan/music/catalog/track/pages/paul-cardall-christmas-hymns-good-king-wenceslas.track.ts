import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChristmasHymnsGoodKingWenceslas = {
  id: "01a0b4c8-5545-7a29-bfb8-4f8ea7454968",
  type: "page-type/track",
  slug: "paul-cardall-christmas-hymns-good-king-wenceslas",
  ownLength: 4.608,
  ownProgress: 4.608,
  partOfCollections: ["release/paul-cardall-christmas-hymns"],
  status: "completed",
  unit: "unit/minutes",
  title: "Good King Wenceslas",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "goodkingwenceslas|7FQRbf8gbKw8KZQZAJWxH2|276480",
  song: "song/paul-cardall-good-king-wenceslas",
  carriedBy: [
    {
      release: "release/paul-cardall-christmas-hymns",
      discNumber: 1,
      position: 9,
      externalId: "6I41mwhctSO8WovoygCOEr",
      externalLink: "https://open.spotify.com/track/6I41mwhctSO8WovoygCOEr",
    },
  ],
} as const satisfies Track
