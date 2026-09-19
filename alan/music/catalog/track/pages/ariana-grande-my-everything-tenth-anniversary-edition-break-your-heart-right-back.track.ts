import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeMyEverythingTenthAnniversaryEditionBreakYourHeartRightBack = {
  id: "01a0a6c5-170f-7b40-8af2-d53de19093c0",
  type: "page-type/track",
  slug: "ariana-grande-my-everything-tenth-anniversary-edition-break-your-heart-right-back",
  ownLength: 4.223166666666667,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-my-everything-tenth-anniversary-edition"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "50TJobiTvboJbFoSykLsYF",
      externalLink: "https://open.spotify.com/track/50TJobiTvboJbFoSykLsYF",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Break Your Heart Right Back",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "73sIBHcqh3Z3NyqHKZ7FOL", artistName: "Childish Gambino" },
  ],
  trackKey: "breakyourheartrightback|66CXWjxzNUsdJxJ2JdwvnR,73sIBHcqh3Z3NyqHKZ7FOL|253390",
  song: "song/ariana-grande-break-your-heart-right-back",
} as const satisfies Track
