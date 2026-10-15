import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const gracieAbramsMinorLongSleeves = {
  id: "01a13fd8-9f1f-7707-a24c-63314a09f7ad",
  type: "page-type/track",
  slug: "gracie-abrams-minor-long-sleeves",
  ownLength: 3.6406666666666667,
  ownProgress: 3.6406666666666667,
  partOfCollections: ["release/gracie-abrams-minor"],
  status: "completed",
  unit: "unit/minutes",
  title: "Long Sleeves",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/gracie-abrams" }],
  trackKey: "longsleeves|4tuJ0bMpJh08umKkEXKUI5|218440",
  song: "song/gracie-abrams-long-sleeves",
  carriedBy: [
    {
      release: "release/gracie-abrams-minor",
      discNumber: 1,
      position: 6,
      externalId: "3wIRxCIGmdxld4ZC6yShZ9",
      externalLink: "https://open.spotify.com/track/3wIRxCIGmdxld4ZC6yShZ9",
    },
  ],
  createdAt: "2026-10-15T13:55:23.541Z",
  updatedAt: "2026-10-15T14:00:29.023Z",
} as const satisfies Track
