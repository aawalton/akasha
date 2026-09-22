import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const nickelCreek2WhyShouldTheFireDieStumptown = {
  id: "01a0caa8-b60a-7243-8f6e-ea83acb7538d",
  type: "page-type/track",
  slug: "nickel-creek-2-why-should-the-fire-die-stumptown",
  ownLength: 1.7328833333333333,
  ownProgress: 1.7328833333333333,
  partOfCollections: ["release/nickel-creek-2-why-should-the-fire-die"],
  status: "completed",
  unit: "unit/minutes",
  title: "Stumptown",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3bcLBxvaI7GsBzGp3WHnwQ", artistName: "Nickel Creek" }],
  trackKey: "stumptown|3bcLBxvaI7GsBzGp3WHnwQ|103973",
  song: "song/nickel-creek-stumptown",
  carriedBy: [
    {
      release: "release/nickel-creek-2-why-should-the-fire-die",
      discNumber: 1,
      position: 8,
      externalId: "5vGF3MCAcb6egZaqmwRAWy",
      externalLink: "https://open.spotify.com/track/5vGF3MCAcb6egZaqmwRAWy",
    },
  ],
} as const satisfies Track
