import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const nickelCreek2ADottedLineHayloft = {
  id: "01a0caa8-b150-74f2-9388-508647ae6175",
  type: "page-type/track",
  slug: "nickel-creek-2-a-dotted-line-hayloft",
  ownLength: 3.2922166666666666,
  ownProgress: 3.2922166666666666,
  partOfCollections: ["release/nickel-creek-2-a-dotted-line"],
  status: "completed",
  unit: "unit/minutes",
  title: "Hayloft",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/nickel-creek" }],
  trackKey: "hayloft|3bcLBxvaI7GsBzGp3WHnwQ|197533",
  song: "song/nickel-creek-hayloft",
  carriedBy: [
    {
      release: "release/nickel-creek-2-a-dotted-line",
      discNumber: 1,
      position: 5,
      externalId: "6dacQ4sqYOVuQKTzSBK2de",
      externalLink: "https://open.spotify.com/track/6dacQ4sqYOVuQKTzSBK2de",
    },
  ],
} as const satisfies Track
