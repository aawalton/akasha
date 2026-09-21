import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jessicaBaioSacredIiVideoStore = {
  id: "01a0c622-0fb7-7903-9b3c-89fbadab3e68",
  type: "page-type/track",
  slug: "jessica-baio-sacred-ii-video-store",
  ownLength: 2.8474,
  ownProgress: 0,
  partOfCollections: ["release/jessica-baio-sacred-ii"],
  status: "not-started",
  unit: "unit/minutes",
  title: "video store",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "0VMFTqmv0hYlWruyBERT95", artistName: "Jessica Baio" }],
  trackKey: "videostore|0VMFTqmv0hYlWruyBERT95|170844",
  song: "song/jessica-baio-video-store",
  carriedBy: [
    {
      release: "release/jessica-baio-sacred-ii",
      discNumber: 1,
      position: 8,
      externalId: "3r1WGuRPfTcnCj6adpY0QG",
      externalLink: "https://open.spotify.com/track/3r1WGuRPfTcnCj6adpY0QG",
    },
  ],
} as const satisfies Track
