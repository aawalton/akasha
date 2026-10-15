import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const gracieAbramsTheSecretOfUsDeluxeNormalThing = {
  id: "01a13fd8-9f23-7dbf-8738-73b018ee8ef3",
  type: "page-type/track",
  slug: "gracie-abrams-the-secret-of-us-deluxe-normal-thing",
  ownLength: 4.041333333333333,
  ownProgress: 0,
  partOfCollections: [
    "release/gracie-abrams-the-secret-of-us-deluxe",
    "release/gracie-abrams-the-secret-of-us",
  ],
  status: "not-started",
  unit: "unit/minutes",
  title: "Normal Thing",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/gracie-abrams" }],
  trackKey: "normalthing|4tuJ0bMpJh08umKkEXKUI5|242480",
  song: "song/gracie-abrams-normal-thing",
  carriedBy: [
    {
      release: "release/gracie-abrams-the-secret-of-us",
      discNumber: 1,
      position: 10,
      externalId: "1MPulKrmSK9EW5IrawhdRs",
      externalLink: "https://open.spotify.com/track/1MPulKrmSK9EW5IrawhdRs",
    },
    {
      release: "release/gracie-abrams-the-secret-of-us-deluxe",
      discNumber: 1,
      position: 10,
      externalId: "5ZCsCQrtEUJUJAylu9TDjY",
      externalLink: "https://open.spotify.com/track/5ZCsCQrtEUJUJAylu9TDjY",
    },
  ],
  createdAt: "2026-10-15T13:55:23.541Z",
  updatedAt: "2026-10-15T13:55:23.541Z",
} as const satisfies Track
