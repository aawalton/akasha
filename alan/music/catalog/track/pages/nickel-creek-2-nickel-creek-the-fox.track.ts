import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const nickelCreek2NickelCreekTheFox = {
  id: "01a0caa8-bca4-7753-ab54-7c2c7c7211d1",
  type: "page-type/track",
  slug: "nickel-creek-2-nickel-creek-the-fox",
  ownLength: 2.5006666666666666,
  ownProgress: 0,
  partOfCollections: ["release/nickel-creek-2-nickel-creek"],
  status: "not-started",
  unit: "unit/minutes",
  title: "The Fox",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3bcLBxvaI7GsBzGp3WHnwQ", artistName: "Nickel Creek" }],
  trackKey: "thefox|3bcLBxvaI7GsBzGp3WHnwQ|150040",
  song: "song/nickel-creek-the-fox",
  carriedBy: [
    {
      release: "release/nickel-creek-2-nickel-creek",
      discNumber: 1,
      position: 11,
      externalId: "0dGfpnQtf1yw0ktC7yFl8b",
      externalLink: "https://open.spotify.com/track/0dGfpnQtf1yw0ktC7yFl8b",
    },
  ],
} as const satisfies Track
