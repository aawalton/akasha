import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPeacefulPianoBeautyFindsHer = {
  id: "01a0b4c8-3287-7e1e-8ca5-f1eda47ffcef",
  type: "page-type/track",
  slug: "paul-cardall-peaceful-piano-beauty-finds-her",
  ownLength: 3.3868833333333335,
  ownProgress: 3.3868833333333335,
  partOfCollections: ["release/paul-cardall-peaceful-piano"],
  status: "completed",
  unit: "unit/minutes",
  title: "Beauty Finds Her",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "beautyfindsher|7FQRbf8gbKw8KZQZAJWxH2|203213",
  song: "song/paul-cardall-beauty-finds-her",
  carriedBy: [
    {
      release: "release/paul-cardall-peaceful-piano",
      discNumber: 1,
      position: 10,
      externalId: "3bx1wjFHMmNr7oR3LX7YzV",
      externalLink: "https://open.spotify.com/track/3bx1wjFHMmNr7oR3LX7YzV",
    },
  ],
} as const satisfies Track
