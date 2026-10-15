import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const gracieAbramsGoodRiddanceDeluxeTheBlue = {
  id: "01a13fd8-9f1e-7296-a66f-a7135d686874",
  type: "page-type/track",
  slug: "gracie-abrams-good-riddance-deluxe-the-blue",
  ownLength: 5.003516666666667,
  ownProgress: 5.003516666666667,
  partOfCollections: ["release/gracie-abrams-good-riddance-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "The blue",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/gracie-abrams" }],
  trackKey: "theblue|4tuJ0bMpJh08umKkEXKUI5|300211",
  song: "song/gracie-abrams-the-blue",
  carriedBy: [
    {
      release: "release/gracie-abrams-good-riddance-deluxe",
      discNumber: 1,
      position: 11,
      externalId: "7jkelF6xQ9oM8BEZRARhhC",
      externalLink: "https://open.spotify.com/track/7jkelF6xQ9oM8BEZRARhhC",
    },
  ],
  createdAt: "2026-10-15T13:55:23.541Z",
  updatedAt: "2026-10-15T14:00:29.023Z",
} as const satisfies Track
