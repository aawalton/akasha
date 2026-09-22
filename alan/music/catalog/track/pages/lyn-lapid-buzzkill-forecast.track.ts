import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const lynLapidBuzzkillForecast = {
  id: "01a0c95e-b139-7336-a843-60c09492e3fe",
  type: "page-type/track",
  slug: "lyn-lapid-buzzkill-forecast",
  ownLength: 2.7284333333333333,
  ownProgress: 2.7284333333333333,
  partOfCollections: ["release/lyn-lapid-buzzkill"],
  status: "completed",
  unit: "unit/minutes",
  title: "forecast",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "4pfy05cNNTacuOQ6SiSu4v", artistName: "Lyn Lapid" }],
  trackKey: "forecast|4pfy05cNNTacuOQ6SiSu4v|163706",
  song: "song/lyn-lapid-forecast",
  carriedBy: [
    {
      release: "release/lyn-lapid-buzzkill",
      discNumber: 1,
      position: 6,
      externalId: "2JsBbehfzt6DTUHZbgWDQJ",
      externalLink: "https://open.spotify.com/track/2JsBbehfzt6DTUHZbgWDQJ",
    },
  ],
} as const satisfies Track
