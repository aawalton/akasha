import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaTheCelts2MarchOfTheCelts = {
  id: "01a0a5b0-2078-70fa-b9f1-b9924a9f4546",
  type: "track",
  slug: "enya-the-celts-2-march-of-the-celts",
  ownLength: 3.2944333333333335,
  ownProgress: 0,
  partOfCollections: ["release/enya-the-celts-2"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3uIMuGMAXOIv1ecbqWwmw0",
      externalLink: "https://open.spotify.com/track/3uIMuGMAXOIv1ecbqWwmw0",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "March of the Celts",
} as const satisfies Track
