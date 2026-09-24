import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const nickelCreek2ThisSideYoung = {
  id: "01a0caa8-ba4b-7996-9acb-06ca4708f8fa",
  type: "page-type/track",
  slug: "nickel-creek-2-this-side-young",
  ownLength: 3.4924333333333335,
  ownProgress: 3.4924333333333335,
  partOfCollections: ["release/nickel-creek-2-this-side"],
  status: "completed",
  unit: "unit/minutes",
  title: "Young",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/nickel-creek" }],
  trackKey: "young|3bcLBxvaI7GsBzGp3WHnwQ|209546",
  song: "song/nickel-creek-young",
  carriedBy: [
    {
      release: "release/nickel-creek-2-this-side",
      discNumber: 1,
      position: 12,
      externalId: "1fCSnotiP3cen8C6uyCKbd",
      externalLink: "https://open.spotify.com/track/1fCSnotiP3cen8C6uyCKbd",
    },
  ],
} as const satisfies Track
