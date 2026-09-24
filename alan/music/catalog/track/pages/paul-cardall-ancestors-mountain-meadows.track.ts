import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallAncestorsMountainMeadows = {
  id: "01a0b4c8-1f13-7772-8096-8cb8029069d9",
  type: "page-type/track",
  slug: "paul-cardall-ancestors-mountain-meadows",
  ownLength: 4.468,
  ownProgress: 4.468,
  partOfCollections: ["release/paul-cardall-ancestors"],
  status: "completed",
  unit: "unit/minutes",
  title: "Mountain Meadows",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "mountainmeadows|7FQRbf8gbKw8KZQZAJWxH2|268080",
  song: "song/paul-cardall-mountain-meadows",
  carriedBy: [
    {
      release: "release/paul-cardall-ancestors",
      discNumber: 1,
      position: 7,
      externalId: "7CCB6ro1J0M2slGILexluE",
      externalLink: "https://open.spotify.com/track/7CCB6ro1J0M2slGILexluE",
    },
  ],
} as const satisfies Track
