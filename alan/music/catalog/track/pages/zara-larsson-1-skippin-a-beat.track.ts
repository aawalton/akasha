import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarsson1SkippinABeat = {
  id: "01a0aa7c-3423-77e4-91aa-9b14108d0cd8",
  type: "page-type/track",
  slug: "zara-larsson-1-skippin-a-beat",
  ownLength: 2.7310166666666666,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-1"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5OYANUpKMMHodc3QM1crJB",
      externalLink: "https://open.spotify.com/track/5OYANUpKMMHodc3QM1crJB",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Skippin A Beat",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "skippinabeat|1Xylc3o4UrD53lo9CvFvVg|163861",
  song: "song/zara-larsson-skippin-a-beat",
} as const satisfies Track
