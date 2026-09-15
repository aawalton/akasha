import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaTheCelts2ToGoBeyondI = {
  id: "01a0a5b0-20e6-7fc9-aeca-000755908134",
  type: "page-type/track",
  slug: "enya-the-celts-2-to-go-beyond-i",
  ownLength: 1.36,
  ownProgress: 0,
  partOfCollections: ["release/enya-the-celts-2"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2QCqlrOEJZqW5BJcq4KDdi",
      externalLink: "https://open.spotify.com/track/2QCqlrOEJZqW5BJcq4KDdi",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "To Go Beyond (I)",
} as const satisfies Track
