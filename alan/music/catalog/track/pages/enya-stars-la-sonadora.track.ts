import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaStarsLaSonadora = {
  id: "01a0a5b0-1741-759c-b2b4-694f7e523849",
  type: "track",
  slug: "enya-stars-la-sonadora",
  ownLength: 3.576,
  ownProgress: 0,
  partOfCollections: ["release/enya-stars"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "33dcd2jXvei3noJeGGrwxm",
      externalLink: "https://open.spotify.com/track/33dcd2jXvei3noJeGGrwxm",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "La Soñadora",
} as const satisfies Track
