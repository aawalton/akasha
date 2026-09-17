import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiSugarStarsCutTheCake = {
  id: "01a0b112-93a4-72a7-9509-5cda53288741",
  type: "page-type/track",
  slug: "vinny-marchi-sugar-stars-cut-the-cake",
  ownLength: 3.6867833333333335,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-sugar-stars"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3XiV1hZl7W4o510SdSHMAy",
      externalLink: "https://open.spotify.com/track/3XiV1hZl7W4o510SdSHMAy",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "cut the cake",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" }],
  trackKey: "cutthecake|5USAMqcbMAzF3HBmeD5pJF|221207",
} as const satisfies Track
