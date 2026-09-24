import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const nickelCreek2CelebrantsFromTheBeach = {
  id: "01a0caa8-a8da-730d-ba8f-7432b9d9338b",
  type: "page-type/track",
  slug: "nickel-creek-2-celebrants-from-the-beach",
  ownLength: 3.4523,
  ownProgress: 3.4523,
  partOfCollections: ["release/nickel-creek-2-celebrants"],
  status: "completed",
  unit: "unit/minutes",
  title: "From the Beach",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/nickel-creek" }],
  trackKey: "fromthebeach|3bcLBxvaI7GsBzGp3WHnwQ|207138",
  song: "song/nickel-creek-from-the-beach",
  carriedBy: [
    {
      release: "release/nickel-creek-2-celebrants",
      discNumber: 1,
      position: 12,
      externalId: "4zvUk01Joc9L8qCawF5VAu",
      externalLink: "https://open.spotify.com/track/4zvUk01Joc9L8qCawF5VAu",
    },
  ],
} as const satisfies Track
