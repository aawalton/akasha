import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarsson1BadBoys = {
  id: "01a0aa7c-35d5-7488-8f65-04132cb39bcb",
  type: "page-type/track",
  slug: "zara-larsson-1-bad-boys",
  ownLength: 2.158,
  ownProgress: 2.158,
  partOfCollections: ["release/zara-larsson-1"],
  status: "completed",
  unit: "unit/minutes",
  title: "Bad Boys",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "badboys|1Xylc3o4UrD53lo9CvFvVg|129480",
  song: "song/zara-larsson-bad-boys",
  carriedBy: [
    {
      release: "release/zara-larsson-1",
      discNumber: 1,
      position: 13,
      externalId: "70u72FPeBl58rThfsRnZ4K",
      externalLink: "https://open.spotify.com/track/70u72FPeBl58rThfsRnZ4K",
    },
  ],
} as const satisfies Track
