import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaGimmeChristmasSnowman = {
  id: "01a0a59c-2495-758b-893d-501ac1009d75",
  type: "track",
  slug: "sia-gimme-christmas-snowman",
  ownLength: 2.7651,
  ownProgress: 0,
  partOfCollections: ["release/sia-gimme-christmas"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4oGT0mXfWHTYfTQffDWGlo",
      externalLink: "https://open.spotify.com/track/4oGT0mXfWHTYfTQffDWGlo",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Snowman",
} as const satisfies Track
