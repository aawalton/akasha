import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallFaithfulSacredNature = {
  id: "01a0b4c8-59e6-70a7-af84-8fbc0e399715",
  type: "page-type/track",
  slug: "paul-cardall-faithful-sacred-nature",
  ownLength: 3.346216666666667,
  ownProgress: 3.346216666666667,
  partOfCollections: ["release/paul-cardall-faithful"],
  status: "completed",
  unit: "unit/minutes",
  title: "Sacred Nature",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "sacrednature|7FQRbf8gbKw8KZQZAJWxH2|200773",
  song: "song/paul-cardall-sacred-nature",
  carriedBy: [
    {
      release: "release/paul-cardall-faithful",
      discNumber: 1,
      position: 5,
      externalId: "0zq4jJ83wSHJTE7bQEqEtm",
      externalLink: "https://open.spotify.com/track/0zq4jJ83wSHJTE7bQEqEtm",
    },
  ],
} as const satisfies Track
