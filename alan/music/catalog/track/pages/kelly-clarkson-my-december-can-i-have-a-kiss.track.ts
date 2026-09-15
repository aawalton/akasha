import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonMyDecemberCanIHaveAKiss = {
  id: "01a0a5ae-ca95-7c0a-8b13-00d9905b588d",
  type: "track",
  slug: "kelly-clarkson-my-december-can-i-have-a-kiss",
  ownLength: 3.49355,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-my-december"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5mPJPRF3jCl01OIk2kGiR3",
      externalLink: "https://open.spotify.com/track/5mPJPRF3jCl01OIk2kGiR3",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Can I Have A Kiss",
} as const satisfies Track
