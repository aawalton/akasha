import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const nickelCreek2ADottedLineElsie = {
  id: "01a0caa8-b0f2-7ea3-9d8d-ea59ea53c2bb",
  type: "page-type/track",
  slug: "nickel-creek-2-a-dotted-line-elsie",
  ownLength: 2.5453333333333332,
  ownProgress: 2.5453333333333332,
  partOfCollections: ["release/nickel-creek-2-a-dotted-line"],
  status: "completed",
  unit: "unit/minutes",
  title: "Elsie",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3bcLBxvaI7GsBzGp3WHnwQ", artistName: "Nickel Creek" }],
  trackKey: "elsie|3bcLBxvaI7GsBzGp3WHnwQ|152720",
  song: "song/nickel-creek-elsie",
  carriedBy: [
    {
      release: "release/nickel-creek-2-a-dotted-line",
      discNumber: 1,
      position: 3,
      externalId: "4SKB2QOzgdXB5RscYKUm9a",
      externalLink: "https://open.spotify.com/track/4SKB2QOzgdXB5RscYKUm9a",
    },
  ],
} as const satisfies Track
