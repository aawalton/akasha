import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const nickelCreek2CelebrantsCelebrants = {
  id: "01a0caa8-a60d-7b4f-8e88-777d82c0c500",
  type: "page-type/track",
  slug: "nickel-creek-2-celebrants-celebrants",
  ownLength: 3.391766666666667,
  ownProgress: 3.391766666666667,
  partOfCollections: ["release/nickel-creek-2-celebrants"],
  status: "completed",
  unit: "unit/minutes",
  title: "Celebrants",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3bcLBxvaI7GsBzGp3WHnwQ", artistName: "Nickel Creek" }],
  trackKey: "celebrants|3bcLBxvaI7GsBzGp3WHnwQ|203506",
  song: "song/nickel-creek-celebrants",
  carriedBy: [
    {
      release: "release/nickel-creek-2-celebrants",
      discNumber: 1,
      position: 1,
      externalId: "2oiIZsx8TsmnKF5TvY42aq",
      externalLink: "https://open.spotify.com/track/2oiIZsx8TsmnKF5TvY42aq",
    },
  ],
} as const satisfies Track
