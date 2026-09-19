import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonEndOfTimeTheRemixesEndOfTimeSpinallRemix = {
  id: "01a0aa7c-39c5-77d6-87f3-d0eeb1827684",
  type: "page-type/track",
  slug: "zara-larsson-end-of-time-the-remixes-end-of-time-spinall-remix",
  ownLength: 3.68775,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-end-of-time-the-remixes"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3qtkD12p554LBcyQo91UA3",
      externalLink: "https://open.spotify.com/track/3qtkD12p554LBcyQo91UA3",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "End Of Time - SPINALL Remix",
  trackType: "remix",
  discNumber: 1,
  explicit: true,
  trackArtist: [
    { externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" },
    { externalId: "2NtQA3PY9chI8l65ejZLTP", artistName: "SPINALL" },
  ],
  trackKey: "endoftimespinallremix|1Xylc3o4UrD53lo9CvFvVg,2NtQA3PY9chI8l65ejZLTP|221265",
  song: "song/zara-larsson-end-of-time",
} as const satisfies Track
