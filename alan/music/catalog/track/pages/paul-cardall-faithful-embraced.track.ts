import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallFaithfulEmbraced = {
  id: "01a0b4c8-5a4d-7dfb-b679-c25c3eb98262",
  type: "page-type/track",
  slug: "paul-cardall-faithful-embraced",
  ownLength: 3.1886666666666668,
  ownProgress: 3.1886666666666668,
  partOfCollections: ["release/paul-cardall-faithful"],
  status: "completed",
  unit: "unit/minutes",
  title: "Embraced",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "embraced|7FQRbf8gbKw8KZQZAJWxH2|191320",
  song: "song/paul-cardall-embraced",
  carriedBy: [
    {
      release: "release/paul-cardall-faithful",
      discNumber: 1,
      position: 8,
      externalId: "5v79fMb22xFB4DnycoaLOE",
      externalLink: "https://open.spotify.com/track/5v79fMb22xFB4DnycoaLOE",
    },
  ],
} as const satisfies Track
