import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeSweetenerBlazedFeatPharrellWilliams = {
  id: "01a0a6c5-2939-7a50-a2b5-6e64c88a08e2",
  type: "page-type/track",
  slug: "ariana-grande-sweetener-blazed-feat-pharrell-williams",
  ownLength: 3.272666666666667,
  ownProgress: 3.272666666666667,
  partOfCollections: ["release/ariana-grande-sweetener"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4mLkiFppf8Xvem6BSY34qw",
      externalLink: "https://open.spotify.com/track/4mLkiFppf8Xvem6BSY34qw",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "blazed (feat. Pharrell Williams)",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "2RdwBSPQiwcmiDo9kixcl8", artistName: "Pharrell Williams" },
  ],
  trackKey: "blazedfeatpharrellwilliams|2RdwBSPQiwcmiDo9kixcl8,66CXWjxzNUsdJxJ2JdwvnR|196360",
  song: "song/ariana-grande-blazed",
  carriedBy: [
    {
      release: "release/ariana-grande-sweetener",
      discNumber: 1,
      position: 2,
      externalId: "4mLkiFppf8Xvem6BSY34qw",
      externalLink: "https://open.spotify.com/track/4mLkiFppf8Xvem6BSY34qw",
    },
  ],
} as const satisfies Track
