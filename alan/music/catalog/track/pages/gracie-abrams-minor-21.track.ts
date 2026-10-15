import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const gracieAbramsMinor21 = {
  id: "01a13fd8-9f1f-7fac-a5ef-e2007faabf12",
  type: "page-type/track",
  slug: "gracie-abrams-minor-21",
  ownLength: 3.0862,
  ownProgress: 3.0862,
  partOfCollections: ["release/gracie-abrams-minor"],
  status: "completed",
  unit: "unit/minutes",
  title: "21",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/gracie-abrams" }],
  trackKey: "21|4tuJ0bMpJh08umKkEXKUI5|185172",
  song: "song/gracie-abrams-21",
  carriedBy: [
    {
      release: "release/gracie-abrams-minor",
      discNumber: 1,
      position: 2,
      externalId: "5meVa5klVlJalupZTvv5XX",
      externalLink: "https://open.spotify.com/track/5meVa5klVlJalupZTvv5XX",
    },
  ],
  createdAt: "2026-10-15T13:55:23.541Z",
  updatedAt: "2026-10-15T14:00:29.023Z",
} as const satisfies Track
