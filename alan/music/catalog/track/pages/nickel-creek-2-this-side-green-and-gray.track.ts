import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const nickelCreek2ThisSideGreenAndGray = {
  id: "01a0caa8-b8f0-7b07-960a-ec57d0aabb03",
  type: "page-type/track",
  slug: "nickel-creek-2-this-side-green-and-gray",
  ownLength: 3.6157666666666666,
  ownProgress: 0,
  partOfCollections: ["release/nickel-creek-2-this-side"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Green And Gray",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3bcLBxvaI7GsBzGp3WHnwQ", artistName: "Nickel Creek" }],
  trackKey: "greenandgray|3bcLBxvaI7GsBzGp3WHnwQ|216946",
  song: "song/nickel-creek-green-and-gray",
  carriedBy: [
    {
      release: "release/nickel-creek-2-this-side",
      discNumber: 1,
      position: 7,
      externalId: "1cFFybFMJ9SCVZjExK0Fi2",
      externalLink: "https://open.spotify.com/track/1cFFybFMJ9SCVZjExK0Fi2",
    },
  ],
} as const satisfies Track
