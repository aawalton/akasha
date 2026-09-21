import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const chaislynSoulmatesSoulmates = {
  id: "01a0b9ec-96fb-76d7-8010-e460b95f8ecb",
  type: "page-type/track",
  slug: "chaislyn-soulmates-soulmates",
  ownLength: 4.518933333333333,
  ownProgress: 4.518933333333333,
  partOfCollections: ["release/chaislyn-soulmates"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "55yTx3urNg5CKnNb9CeX59",
      externalLink: "https://open.spotify.com/track/55yTx3urNg5CKnNb9CeX59",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Soulmates",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "3zmbniiciaBAJlSX1Bzq9R", artistName: "Chaislyn" }],
  trackKey: "soulmates|3zmbniiciaBAJlSX1Bzq9R|271136",
  song: "song/chaislyn-soulmates",
  carriedBy: [
    {
      release: "release/chaislyn-soulmates",
      discNumber: 1,
      position: 1,
      externalId: "55yTx3urNg5CKnNb9CeX59",
      externalLink: "https://open.spotify.com/track/55yTx3urNg5CKnNb9CeX59",
    },
  ],
} as const satisfies Track
