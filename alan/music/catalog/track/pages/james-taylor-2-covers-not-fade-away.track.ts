import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2CoversNotFadeAway = {
  id: "01a0abeb-350d-715a-87c6-1cc94671b456",
  type: "page-type/track",
  slug: "james-taylor-2-covers-not-fade-away",
  ownLength: 2.7624333333333335,
  ownProgress: 2.7624333333333335,
  partOfCollections: ["release/james-taylor-2-covers"],
  status: "completed",
  unit: "unit/minutes",
  title: "Not Fade Away",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "notfadeaway|0vn7UBvSQECKJm2817Yf1P|165746",
  song: "song/james-taylor-not-fade-away",
  carriedBy: [
    {
      release: "release/james-taylor-2-covers",
      discNumber: 1,
      position: 12,
      externalId: "7t5fb6craNhAoPuz4dbIkE",
      externalLink: "https://open.spotify.com/track/7t5fb6craNhAoPuz4dbIkE",
    },
  ],
} as const satisfies Track
