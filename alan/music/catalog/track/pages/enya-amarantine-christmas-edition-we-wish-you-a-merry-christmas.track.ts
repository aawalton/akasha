import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaAmarantineChristmasEditionWeWishYouAMerryChristmas = {
  id: "01a0a5b0-1306-7d08-8308-87d11cc4e965",
  type: "page-type/track",
  slug: "enya-amarantine-christmas-edition-we-wish-you-a-merry-christmas",
  ownLength: 3.66665,
  ownProgress: 0,
  partOfCollections: ["release/enya-amarantine-christmas-edition"],
  position: 15,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3hjyjwSen6hiiaztDfhZL0",
      externalLink: "https://open.spotify.com/track/3hjyjwSen6hiiaztDfhZL0",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "We Wish You a Merry Christmas",
} as const satisfies Track
