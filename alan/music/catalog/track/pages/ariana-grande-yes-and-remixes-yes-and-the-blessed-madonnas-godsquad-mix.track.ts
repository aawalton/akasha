import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeYesAndRemixesYesAndTheBlessedMadonnasGodsquadMix = {
  id: "01a0a6c5-3614-7ce8-967f-be462c270a89",
  type: "page-type/track",
  slug: "ariana-grande-yes-and-remixes-yes-and-the-blessed-madonnas-godsquad-mix",
  ownLength: 5.033033333333333,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-yes-and-remixes"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1GxNDaFx9411X1g7cCf55E",
      externalLink: "https://open.spotify.com/track/1GxNDaFx9411X1g7cCf55E",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "yes, and? - The Blessed Madonna’s Godsquad Mix",
  trackType: "remix",
  discNumber: 1,
  explicit: true,
  trackArtist: [
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "4TvhRzxIL1le2PWCeUqxQw", artistName: "The Blessed Madonna" },
  ],
  trackKey:
    "yesandtheblessedmadonnasgodsquadmix|4TvhRzxIL1le2PWCeUqxQw,66CXWjxzNUsdJxJ2JdwvnR|301982",
  song: "song/ariana-grande-yes-and",
} as const satisfies Track
