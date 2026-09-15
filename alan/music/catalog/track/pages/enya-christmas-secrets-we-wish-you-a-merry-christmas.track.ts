import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaChristmasSecretsWeWishYouAMerryChristmas = {
  id: "01a0a5b0-098b-79c0-80fd-784f0818b2ec",
  type: "page-type/track",
  slug: "enya-christmas-secrets-we-wish-you-a-merry-christmas",
  ownLength: 3.66665,
  ownProgress: 0,
  partOfCollections: ["release/enya-christmas-secrets"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3JGKPrdhp60lxXYQoUInsr",
      externalLink: "https://open.spotify.com/track/3JGKPrdhp60lxXYQoUInsr",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "We Wish You a Merry Christmas",
} as const satisfies Track
