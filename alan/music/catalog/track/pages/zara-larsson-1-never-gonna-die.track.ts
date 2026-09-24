import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarsson1NeverGonnaDie = {
  id: "01a0aa7c-3488-7baf-8be0-cbc5a1d27b88",
  type: "page-type/track",
  slug: "zara-larsson-1-never-gonna-die",
  ownLength: 3.7713666666666668,
  ownProgress: 3.7713666666666668,
  partOfCollections: ["release/zara-larsson-1"],
  status: "completed",
  unit: "unit/minutes",
  title: "Never Gonna Die",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "nevergonnadie|1Xylc3o4UrD53lo9CvFvVg|226282",
  song: "song/zara-larsson-never-gonna-die",
  carriedBy: [
    {
      release: "release/zara-larsson-1",
      discNumber: 1,
      position: 4,
      externalId: "2iAsEQ50dfeAm5BRuSYdjR",
      externalLink: "https://open.spotify.com/track/2iAsEQ50dfeAm5BRuSYdjR",
    },
  ],
} as const satisfies Track
