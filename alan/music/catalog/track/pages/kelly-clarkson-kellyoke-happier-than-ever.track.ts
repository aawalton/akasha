import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonKellyokeHappierThanEver = {
  id: "01a0a5ae-d18c-7206-890e-2489b6351b89",
  type: "page-type/track",
  slug: "kelly-clarkson-kellyoke-happier-than-ever",
  ownLength: 4.245416666666666,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-kellyoke"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3jAj05GZHIGVkJTA4WRau5",
      externalLink: "https://open.spotify.com/track/3jAj05GZHIGVkJTA4WRau5",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Happier Than Ever",
} as const satisfies Track
