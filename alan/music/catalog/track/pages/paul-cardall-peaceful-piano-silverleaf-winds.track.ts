import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPeacefulPianoSilverleafWinds = {
  id: "01a0b4c8-3268-716d-98ab-2bf963135cd1",
  type: "page-type/track",
  slug: "paul-cardall-peaceful-piano-silverleaf-winds",
  ownLength: 2.8846666666666665,
  ownProgress: 2.8846666666666665,
  partOfCollections: ["release/paul-cardall-peaceful-piano"],
  status: "completed",
  unit: "unit/minutes",
  title: "Silverleaf Winds",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "silverleafwinds|7FQRbf8gbKw8KZQZAJWxH2|173080",
  song: "song/paul-cardall-silverleaf-winds",
  carriedBy: [
    {
      release: "release/paul-cardall-peaceful-piano",
      discNumber: 1,
      position: 9,
      externalId: "6w1c1Wg6Phl6wpE9eHRzAB",
      externalLink: "https://open.spotify.com/track/6w1c1Wg6Phl6wpE9eHRzAB",
    },
  ],
} as const satisfies Track
