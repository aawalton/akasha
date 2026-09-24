import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const nickelCreek2CelebrantsThinnestWall = {
  id: "01a0caa8-a721-767d-8ac0-4828c80610e4",
  type: "page-type/track",
  slug: "nickel-creek-2-celebrants-thinnest-wall",
  ownLength: 3.1333333333333333,
  ownProgress: 3.1333333333333333,
  partOfCollections: ["release/nickel-creek-2-celebrants"],
  status: "completed",
  unit: "unit/minutes",
  title: "Thinnest Wall",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/nickel-creek" }],
  trackKey: "thinnestwall|3bcLBxvaI7GsBzGp3WHnwQ|188000",
  song: "song/nickel-creek-thinnest-wall",
  carriedBy: [
    {
      release: "release/nickel-creek-2-celebrants",
      discNumber: 1,
      position: 5,
      externalId: "1k3ldKfJHTAc56PoVsv9YA",
      externalLink: "https://open.spotify.com/track/1k3ldKfJHTAc56PoVsv9YA",
    },
  ],
} as const satisfies Track
