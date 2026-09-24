import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const yaelokreHayfieldsHarpyHare = {
  id: "01a0ce87-16f5-7d98-adfe-6ade3d7cc99f",
  type: "page-type/track",
  slug: "yaelokre-hayfields-harpy-hare",
  ownLength: 3.0153666666666665,
  ownProgress: 3.0153666666666665,
  partOfCollections: ["release/yaelokre-hayfields", "release/yaelokre-harpy-hare"],
  status: "completed",
  unit: "unit/minutes",
  title: "Harpy Hare",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/yaelokre" }],
  trackKey: "harpyhare|3rRyfgGByetsaaujkjQ7rY|180922",
  song: "song/yaelokre-harpy-hare",
  carriedBy: [
    {
      release: "release/yaelokre-harpy-hare",
      discNumber: 1,
      position: 1,
      externalId: "6pWlv50Lthad8jyd6f1TlC",
      externalLink: "https://open.spotify.com/track/6pWlv50Lthad8jyd6f1TlC",
    },
    {
      release: "release/yaelokre-hayfields",
      discNumber: 1,
      position: 2,
      externalId: "38Yw8SJlidDcmSrLEPWrxc",
      externalLink: "https://open.spotify.com/track/38Yw8SJlidDcmSrLEPWrxc",
    },
  ],
} as const satisfies Track
