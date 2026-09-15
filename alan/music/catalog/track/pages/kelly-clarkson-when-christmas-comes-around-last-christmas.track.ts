import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonWhenChristmasComesAroundLastChristmas = {
  id: "01a0a5ae-bb5d-7fab-be3c-b93c1e4c4343",
  type: "track",
  slug: "kelly-clarkson-when-christmas-comes-around-last-christmas",
  ownLength: 3.1596333333333333,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-when-christmas-comes-around"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5gDlJZ5cep6GuhfOVolYDN",
      externalLink: "https://open.spotify.com/track/5gDlJZ5cep6GuhfOVolYDN",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Last Christmas",
} as const satisfies Track
