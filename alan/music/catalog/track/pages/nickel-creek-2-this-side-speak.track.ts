import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const nickelCreek2ThisSideSpeak = {
  id: "01a0caa8-b812-76d3-aae6-d5bffd07bcfb",
  type: "page-type/track",
  slug: "nickel-creek-2-this-side-speak",
  ownLength: 4.022466666666666,
  ownProgress: 4.022466666666666,
  partOfCollections: ["release/nickel-creek-2-this-side"],
  status: "completed",
  unit: "unit/minutes",
  title: "Speak",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/nickel-creek" }],
  trackKey: "speak|3bcLBxvaI7GsBzGp3WHnwQ|241348",
  song: "song/nickel-creek-speak",
  carriedBy: [
    {
      release: "release/nickel-creek-2-this-side",
      discNumber: 1,
      position: 3,
      externalId: "5sx9hOWgRSJvfYpk1i0RQ6",
      externalLink: "https://open.spotify.com/track/5sx9hOWgRSJvfYpk1i0RQ6",
    },
  ],
} as const satisfies Track
