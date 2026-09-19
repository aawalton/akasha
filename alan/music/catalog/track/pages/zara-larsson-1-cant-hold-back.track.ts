import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarsson1CantHoldBack = {
  id: "01a0aa7c-34cd-790d-b29f-a293293d84cc",
  type: "page-type/track",
  slug: "zara-larsson-1-cant-hold-back",
  ownLength: 3.6803166666666667,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-1"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6XtuvafYJpfFyKi0ijqggr",
      externalLink: "https://open.spotify.com/track/6XtuvafYJpfFyKi0ijqggr",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Can't Hold Back",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "cantholdback|1Xylc3o4UrD53lo9CvFvVg|220819",
  song: "song/zara-larsson-can-t-hold-back",
} as const satisfies Track
