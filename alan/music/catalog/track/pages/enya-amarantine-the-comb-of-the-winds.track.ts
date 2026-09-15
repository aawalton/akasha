import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaAmarantineTheCombOfTheWinds = {
  id: "01a0a5b0-2297-7f5c-ab74-29d9b76bd344",
  type: "page-type/track",
  slug: "enya-amarantine-the-comb-of-the-winds",
  ownLength: 3.6593333333333335,
  ownProgress: 0,
  partOfCollections: ["release/enya-amarantine"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5K6Ao6qw2CYrZ6mUJaacAQ",
      externalLink: "https://open.spotify.com/track/5K6Ao6qw2CYrZ6mUJaacAQ",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "The Comb of the Winds",
} as const satisfies Track
