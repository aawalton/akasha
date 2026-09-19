import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const chaislynSoulmatesSoulmates = {
  id: "01a0b9ec-96fb-76d7-8010-e460b95f8ecb",
  type: "page-type/track",
  slug: "chaislyn-soulmates-soulmates",
  ownLength: 4.518933333333333,
  ownProgress: 0,
  partOfCollections: ["release/chaislyn-soulmates"],
  position: 1,
  status: "not-started",
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
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "3zmbniiciaBAJlSX1Bzq9R", artistName: "Chaislyn" }],
  trackKey: "soulmates|3zmbniiciaBAJlSX1Bzq9R|271136",
  song: "song/chaislyn-soulmates",
} as const satisfies Track
