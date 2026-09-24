import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheChristmasBoxTheFirstNoel = {
  id: "01a0b4c8-65c5-7d1f-beee-4a1621a2d3ec",
  type: "page-type/track",
  slug: "paul-cardall-the-christmas-box-the-first-noel",
  ownLength: 2.7462166666666668,
  ownProgress: 2.7462166666666668,
  partOfCollections: ["release/paul-cardall-the-christmas-box"],
  status: "completed",
  unit: "unit/minutes",
  title: "The First Noel",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "thefirstnoel|7FQRbf8gbKw8KZQZAJWxH2|164773",
  song: "song/paul-cardall-the-first-noel",
  carriedBy: [
    {
      release: "release/paul-cardall-the-christmas-box",
      discNumber: 1,
      position: 9,
      externalId: "0W6BmzhYSDQdMkYKuxR3yN",
      externalLink: "https://open.spotify.com/track/0W6BmzhYSDQdMkYKuxR3yN",
    },
  ],
} as const satisfies Track
