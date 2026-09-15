import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaStarsPaintTheSkyWithStars = {
  id: "01a0a5b0-16db-719d-b08b-4ec00591c26c",
  type: "track",
  slug: "enya-stars-paint-the-sky-with-stars",
  ownLength: 4.2251,
  ownProgress: 0,
  partOfCollections: ["release/enya-stars"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "45rqOxKAfyl1O8NNqKay4j",
      externalLink: "https://open.spotify.com/track/45rqOxKAfyl1O8NNqKay4j",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Paint the Sky with Stars",
} as const satisfies Track
