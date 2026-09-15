import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaCloudsMarchOfTheCelts = {
  id: "01a0a5b0-2a4f-7495-b099-775a61745b31",
  type: "page-type/track",
  slug: "enya-clouds-march-of-the-celts",
  ownLength: 3.25955,
  ownProgress: 0,
  partOfCollections: ["release/enya-clouds"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6rKp6vMEZunwf8EeSWqnz9",
      externalLink: "https://open.spotify.com/track/6rKp6vMEZunwf8EeSWqnz9",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "March of the Celts",
} as const satisfies Track
