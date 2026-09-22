import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const nickelCreek2WhyShouldTheFireDieDoubtingThomas = {
  id: "01a0caa8-b6b7-7fd0-86c0-4f67e510d3ae",
  type: "page-type/track",
  slug: "nickel-creek-2-why-should-the-fire-die-doubting-thomas",
  ownLength: 3.318433333333333,
  ownProgress: 3.318433333333333,
  partOfCollections: ["release/nickel-creek-2-why-should-the-fire-die"],
  status: "completed",
  unit: "unit/minutes",
  title: "Doubting Thomas",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3bcLBxvaI7GsBzGp3WHnwQ", artistName: "Nickel Creek" }],
  trackKey: "doubtingthomas|3bcLBxvaI7GsBzGp3WHnwQ|199106",
  song: "song/nickel-creek-doubting-thomas",
  carriedBy: [
    {
      release: "release/nickel-creek-2-why-should-the-fire-die",
      discNumber: 1,
      position: 11,
      externalId: "5Y5mqKOWd1wzqSqBeYaeO9",
      externalLink: "https://open.spotify.com/track/5Y5mqKOWd1wzqSqBeYaeO9",
    },
  ],
} as const satisfies Track
