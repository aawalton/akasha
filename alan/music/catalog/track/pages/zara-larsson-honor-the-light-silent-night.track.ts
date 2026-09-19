import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonHonorTheLightSilentNight = {
  id: "01a0aa7c-38e5-7b2b-8b2b-effbd88b89f5",
  type: "page-type/track",
  slug: "zara-larsson-honor-the-light-silent-night",
  ownLength: 1.7011,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-honor-the-light"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4TwKTu6EOJFvAlDAzQRWrd",
      externalLink: "https://open.spotify.com/track/4TwKTu6EOJFvAlDAzQRWrd",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Silent Night",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "silentnight|1Xylc3o4UrD53lo9CvFvVg|102066",
  song: "song/celtic-woman-silent-night",
} as const satisfies Track
