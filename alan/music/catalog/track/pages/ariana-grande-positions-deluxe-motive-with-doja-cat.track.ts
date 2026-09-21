import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePositionsDeluxeMotiveWithDojaCat = {
  id: "01a0a6c5-1f18-78b8-90f2-79d71ed5111e",
  type: "page-type/track",
  slug: "ariana-grande-positions-deluxe-motive-with-doja-cat",
  ownLength: 2.7998166666666666,
  ownProgress: 2.7998166666666666,
  partOfCollections: ["release/ariana-grande-positions-deluxe", "release/ariana-grande-positions"],
  position: 3,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5VipERQ1ofCowecoFg2MVU",
      externalLink: "https://open.spotify.com/track/5VipERQ1ofCowecoFg2MVU",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "motive (with Doja Cat)",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "5cj0lLjcoR7YOSnhnX0Po5", artistName: "Doja Cat" },
  ],
  trackKey: "motivewithdojacat|5cj0lLjcoR7YOSnhnX0Po5,66CXWjxzNUsdJxJ2JdwvnR|167989",
  song: "song/ariana-grande-motive",
  carriedBy: [
    {
      release: "release/ariana-grande-positions",
      discNumber: 1,
      position: 3,
      externalId: "5GkQIP5mWPi4KZLLXeuFTT",
      externalLink: "https://open.spotify.com/track/5GkQIP5mWPi4KZLLXeuFTT",
    },
    {
      release: "release/ariana-grande-positions-deluxe",
      discNumber: 1,
      position: 3,
      externalId: "5VipERQ1ofCowecoFg2MVU",
      externalLink: "https://open.spotify.com/track/5VipERQ1ofCowecoFg2MVU",
    },
  ],
} as const satisfies Track
