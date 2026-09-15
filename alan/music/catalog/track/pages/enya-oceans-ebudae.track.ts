import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaOceansEbudae = {
  id: "01a0a5b0-2d60-75de-95d6-852da2c538bd",
  type: "page-type/track",
  slug: "enya-oceans-ebudae",
  ownLength: 1.936,
  ownProgress: 0,
  partOfCollections: ["release/enya-oceans"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4IkXBv0hicd8Jw1d2hiI5v",
      externalLink: "https://open.spotify.com/track/4IkXBv0hicd8Jw1d2hiI5v",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Ebudae",
} as const satisfies Track
