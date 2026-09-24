import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarsson1IfIWasYourGirl = {
  id: "01a0aa7c-351a-76b3-9566-3f19515ba974",
  type: "page-type/track",
  slug: "zara-larsson-1-if-i-was-your-girl",
  ownLength: 2.6628,
  ownProgress: 2.6628,
  partOfCollections: ["release/zara-larsson-1"],
  status: "completed",
  unit: "unit/minutes",
  title: "If I Was Your Girl",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "ifiwasyourgirl|1Xylc3o4UrD53lo9CvFvVg|159768",
  song: "song/zara-larsson-if-i-was-your-girl",
  carriedBy: [
    {
      release: "release/zara-larsson-1",
      discNumber: 1,
      position: 8,
      externalId: "6jHeMZkWtBd4Q8GCyZl8mx",
      externalLink: "https://open.spotify.com/track/6jHeMZkWtBd4Q8GCyZl8mx",
    },
  ],
} as const satisfies Track
