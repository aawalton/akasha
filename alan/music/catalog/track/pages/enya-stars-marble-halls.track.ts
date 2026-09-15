import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaStarsMarbleHalls = {
  id: "01a0a5b0-1829-75f0-b665-1fadd837aa31",
  type: "page-type/track",
  slug: "enya-stars-marble-halls",
  ownLength: 3.9033333333333333,
  ownProgress: 0,
  partOfCollections: ["release/enya-stars"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4dsgd2vYv7xCPbkRIxoFhC",
      externalLink: "https://open.spotify.com/track/4dsgd2vYv7xCPbkRIxoFhC",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Marble Halls",
} as const satisfies Track
