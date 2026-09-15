import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaOceansStormsInAfrica = {
  id: "01a0a5b0-2cee-7872-a055-5c2327a9afb6",
  type: "page-type/track",
  slug: "enya-oceans-storms-in-africa",
  ownLength: 4.02,
  ownProgress: 0,
  partOfCollections: ["release/enya-oceans"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3QuR05SRQrNjo0RP3Kod4F",
      externalLink: "https://open.spotify.com/track/3QuR05SRQrNjo0RP3Kod4F",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Storms in Africa",
} as const satisfies Track
