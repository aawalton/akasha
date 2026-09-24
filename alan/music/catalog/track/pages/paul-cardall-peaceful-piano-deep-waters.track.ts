import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPeacefulPianoDeepWaters = {
  id: "01a0b4c8-31a4-7538-a2e8-4493edb0472d",
  type: "page-type/track",
  slug: "paul-cardall-peaceful-piano-deep-waters",
  ownLength: 3.4191,
  ownProgress: 3.4191,
  partOfCollections: ["release/paul-cardall-peaceful-piano"],
  status: "completed",
  unit: "unit/minutes",
  title: "Deep Waters",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "deepwaters|7FQRbf8gbKw8KZQZAJWxH2|205146",
  song: "song/paul-cardall-deep-waters",
  carriedBy: [
    {
      release: "release/paul-cardall-peaceful-piano",
      discNumber: 1,
      position: 3,
      externalId: "4Wjgkn2ccF4Fm0Pe1Q5gb3",
      externalLink: "https://open.spotify.com/track/4Wjgkn2ccF4Fm0Pe1Q5gb3",
    },
  ],
} as const satisfies Track
