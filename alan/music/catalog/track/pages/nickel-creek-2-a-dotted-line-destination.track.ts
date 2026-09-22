import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const nickelCreek2ADottedLineDestination = {
  id: "01a0caa8-b0ac-7103-be04-2437997a73b6",
  type: "page-type/track",
  slug: "nickel-creek-2-a-dotted-line-destination",
  ownLength: 3.854,
  ownProgress: 3.854,
  partOfCollections: ["release/nickel-creek-2-a-dotted-line"],
  status: "completed",
  unit: "unit/minutes",
  title: "Destination",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3bcLBxvaI7GsBzGp3WHnwQ", artistName: "Nickel Creek" }],
  trackKey: "destination|3bcLBxvaI7GsBzGp3WHnwQ|231240",
  song: "song/nickel-creek-destination",
  carriedBy: [
    {
      release: "release/nickel-creek-2-a-dotted-line",
      discNumber: 1,
      position: 2,
      externalId: "6kuqHs2ijp5D8tj0XokQQo",
      externalLink: "https://open.spotify.com/track/6kuqHs2ijp5D8tj0XokQQo",
    },
  ],
} as const satisfies Track
