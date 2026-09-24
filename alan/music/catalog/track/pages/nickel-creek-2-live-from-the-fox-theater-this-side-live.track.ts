import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const nickelCreek2LiveFromTheFoxTheaterThisSideLive = {
  id: "01a0caa8-ab52-76a6-ab87-402108134cae",
  type: "page-type/track",
  slug: "nickel-creek-2-live-from-the-fox-theater-this-side-live",
  ownLength: 4.163466666666666,
  ownProgress: 4.163466666666666,
  partOfCollections: ["release/nickel-creek-2-live-from-the-fox-theater"],
  status: "completed",
  unit: "unit/minutes",
  title: "This Side - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/nickel-creek" }],
  trackKey: "thissidelive|3bcLBxvaI7GsBzGp3WHnwQ|249808",
  song: "song/nickel-creek-this-side",
  carriedBy: [
    {
      release: "release/nickel-creek-2-live-from-the-fox-theater",
      discNumber: 1,
      position: 3,
      externalId: "6AzTwWfvApEzZiNygwX88u",
      externalLink: "https://open.spotify.com/track/6AzTwWfvApEzZiNygwX88u",
    },
  ],
} as const satisfies Track
