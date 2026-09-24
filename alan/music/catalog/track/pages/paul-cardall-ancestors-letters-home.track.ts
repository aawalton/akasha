import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallAncestorsLettersHome = {
  id: "01a0b4c8-1e38-75f9-b1ee-568f9cb0d086",
  type: "page-type/track",
  slug: "paul-cardall-ancestors-letters-home",
  ownLength: 0.976,
  ownProgress: 0.976,
  partOfCollections: ["release/paul-cardall-ancestors"],
  status: "completed",
  unit: "unit/minutes",
  title: "Letters Home",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "lettershome|7FQRbf8gbKw8KZQZAJWxH2|58560",
  song: "song/paul-cardall-letters-home",
  carriedBy: [
    {
      release: "release/paul-cardall-ancestors",
      discNumber: 1,
      position: 1,
      externalId: "2VDpEIMlCyPwLC6iqKy3Cb",
      externalLink: "https://open.spotify.com/track/2VDpEIMlCyPwLC6iqKy3Cb",
    },
  ],
} as const satisfies Track
