import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePetalOhWell = {
  id: "01a0a6c5-0467-7862-878c-a08ac778d43d",
  type: "page-type/track",
  slug: "ariana-grande-petal-oh-well",
  ownLength: 3.269433333333333,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-petal"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5DZOKNtaoVEssXu9ltcMjx",
      externalLink: "https://open.spotify.com/track/5DZOKNtaoVEssXu9ltcMjx",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "oh well",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "ohwell|66CXWjxzNUsdJxJ2JdwvnR|196166",
} as const satisfies Track
