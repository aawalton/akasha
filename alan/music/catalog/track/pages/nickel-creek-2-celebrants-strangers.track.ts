import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const nickelCreek2CelebrantsStrangers = {
  id: "01a0caa8-bd0b-7b71-91be-bab993792db7",
  type: "page-type/track",
  slug: "nickel-creek-2-celebrants-strangers",
  ownLength: 4.74135,
  ownProgress: 4.74135,
  partOfCollections: ["release/nickel-creek-2-celebrants", "release/nickel-creek-2-strangers"],
  status: "completed",
  unit: "unit/minutes",
  title: "Strangers",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3bcLBxvaI7GsBzGp3WHnwQ", artistName: "Nickel Creek" }],
  trackKey: "strangers|3bcLBxvaI7GsBzGp3WHnwQ|284481",
  song: "song/nickel-creek-strangers",
  carriedBy: [
    {
      release: "release/nickel-creek-2-celebrants",
      discNumber: 1,
      position: 2,
      externalId: "5bd4yBTUxNdF1bCdbCY334",
      externalLink: "https://open.spotify.com/track/5bd4yBTUxNdF1bCdbCY334",
    },
    {
      release: "release/nickel-creek-2-strangers",
      discNumber: 1,
      position: 1,
      externalId: "1LGEfISCKTSlz0MMjJ9PjC",
      externalLink: "https://open.spotify.com/track/1LGEfISCKTSlz0MMjJ9PjC",
    },
  ],
} as const satisfies Track
