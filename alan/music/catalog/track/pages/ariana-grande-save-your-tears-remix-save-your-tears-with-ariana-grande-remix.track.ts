import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeSaveYourTearsRemixSaveYourTearsWithArianaGrandeRemix = {
  id: "01a0a6c5-3713-7703-be3c-6e8c5e38d88a",
  type: "page-type/track",
  slug: "ariana-grande-save-your-tears-remix-save-your-tears-with-ariana-grande-remix",
  ownLength: 3.18355,
  ownProgress: 3.18355,
  partOfCollections: ["release/ariana-grande-save-your-tears-remix"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "37BZB0z9T8Xu7U3e65qxFy",
      externalLink: "https://open.spotify.com/track/37BZB0z9T8Xu7U3e65qxFy",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Save Your Tears (with Ariana Grande) (Remix)",
  trackType: "remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "1Xyo4u8uXC1ZmMpatF05PJ", artistName: "The Weeknd" },
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
  ],
  trackKey:
    "saveyourtearswitharianagranderemix|1Xyo4u8uXC1ZmMpatF05PJ,66CXWjxzNUsdJxJ2JdwvnR|191013",
  song: "song/ariana-grande-save-your-tears",
  carriedBy: [
    {
      release: "release/ariana-grande-save-your-tears-remix",
      discNumber: 1,
      position: 1,
      externalId: "37BZB0z9T8Xu7U3e65qxFy",
      externalLink: "https://open.spotify.com/track/37BZB0z9T8Xu7U3e65qxFy",
    },
  ],
} as const satisfies Track
